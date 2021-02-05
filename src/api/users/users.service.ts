import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FilterUsersDTO, UserIncludesDTO } from './dto';
import { Logger } from '@shared/logger/Logger';
import { Model, Query } from 'mongoose';
import { User } from '@mongoose/schemas/User';
import { InjectModel } from '@nestjs/mongoose';
import { getValidAttributes } from '@/utils/ObjectUtils';
import * as admin from 'firebase-admin';
import { ROLES } from '@/config';
import { StoreUserDTO } from './dto/store-user.dto';
import { GoogleFirebaseUser, JSONObject } from '@/shared/types';
import { getPagination, PaginatedResponse } from '@/shared/pagination';
import { PaginationDTO } from '@/shared/pagination/types/Pagination.dto';
import { fromDateToDateFilter, isValidMongooseId } from '@/database/mongoose/utils/MongooseUtils';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private logger: Logger) {
        this.logger.setContext(`${User.name}Service`);
    }

    private handleFilters(filters?: FilterUsersDTO): JSONObject {
        const validFilters = filters ? getValidAttributes(filters) : {};

        if (validFilters.fromDate || validFilters.toDate) {
            validFilters.createdAt = fromDateToDateFilter(validFilters.fromDate, validFilters.toDate);

            delete validFilters.fromDate;
            delete validFilters.toDate;
        }

        return validFilters;
    }

    private handleIncludes<T>(query: Query<T, User>, includes?: UserIncludesDTO): Query<T, User> {
        if (includes) {
        }
        return query;
    }

    async getAll(
        pagination: PaginationDTO,
        filters?: FilterUsersDTO,
        includes?: UserIncludesDTO,
    ): Promise<PaginatedResponse<User>> {
        this.logger.log(`Listando ${User.name}...`);
        const validFilters = this.handleFilters(filters);

        const total = await this.userModel.countDocuments(validFilters);
        let query = this.userModel.find(validFilters).skip(Number(pagination.skip)).limit(Number(pagination.limit));

        query = this.handleIncludes(query, includes);

        const result = new PaginatedResponse<User>();
        result.pagination = getPagination({
            skip: Number(pagination.skip),
            limit: Number(pagination.limit),
            total,
        });

        result.results = await query;

        return result;
    }

    async getOne(id: string, includes?: UserIncludesDTO): Promise<User> {
        this.logger.debug(`Listando ${User.name} ${id}`);
        id = String(id).toString();

        let query: Query<User, User>;

        if (isValidMongooseId(id)) {
            query = this.userModel.findOne({
                _id: id,
            });
        } else {
            query = this.userModel.findOne({
                firebaseId: id,
            });
        }

        const user = await this.handleIncludes(query, includes);

        if (!user) {
            throw new HttpException(`${User.name} não encontrado`, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async storeUser(storeUserDTO: StoreUserDTO, roles: string[]): Promise<void> {
        const exists = await this.verifyIfExistsByEmail(storeUserDTO.email);

        if (exists) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
        }

        const firebaseUser = await this.storeFirebaseUser(storeUserDTO).catch((err) => {
            this.logger.error(`Erro ao cadastrar Usuário ${storeUserDTO.email} no Firebase`, err);
            throw err;
        });

        await this.userModel
            .create({
                ...storeUserDTO,
                roles,
                firebaseId: firebaseUser.uid,
                photoURL: firebaseUser.photoURL,
            })
            .catch(async (err) => {
                this.logger.error(`Erro ao cadastrar Usuário ${storeUserDTO.email}`, err);
                await admin.auth().deleteUser(firebaseUser.uid);
                throw err;
            });
    }

    async verifyIfExistsByEmail(email: string): Promise<boolean> {
        return await this.userModel.exists({
            email,
        });
    }

    async setFirebaseUserRoles(firebaseId: string, roles: string[]): Promise<void> {
        const userClaims = {};

        Object.values(ROLES).forEach((role) => {
            userClaims[role] = false;
        });

        roles.forEach((role) => {
            userClaims[role] = true;
        });

        return await admin.auth().setCustomUserClaims(firebaseId, userClaims);
    }

    async update(id: string, dto: Partial<User>): Promise<User> {
        this.logger.log(`Editando ${User.name} ${id}`);
        const user = await this.getOne(id);

        if (dto.name || dto.lastname) {
            await admin.auth().updateUser(user.firebaseId, {
                displayName: `${dto.name || user.name || ''} ${dto.lastname || user.name || ''}`,
            });
        }

        const updated = await this.userModel.findByIdAndUpdate(
            user._id,
            {
                ...dto,
            },
            {
                lean: true,
            },
        );

        return updated as User;
    }

    async delete(id: string): Promise<void> {
        this.logger.log(`Removendo ${User.name} ${id}`);

        const user = await this.getOne(id);

        await admin.auth().updateUser(user.firebaseId, {
            disabled: true,
        });
        return await this.userModel.updateOne(
            {
                firebaseId: user.firebaseId,
            },
            {
                $set: {
                    isDeleted: true,
                },
            },
        );
    }

    async storeFirebaseUser(storeUserDTO: StoreUserDTO): Promise<admin.auth.UserRecord> {
        const userRecord = await admin.auth().createUser({
            email: storeUserDTO.email,
            password: storeUserDTO.password,
            displayName: `${storeUserDTO.name} ${storeUserDTO.lastname}`,
            emailVerified: !!storeUserDTO.emailIsConfirmed,
            disabled: false,
        });

        const userClaims = {};

        Object.keys(ROLES).forEach((role) => {
            userClaims[role] = false;
        });

        storeUserDTO.roles.forEach((role) => {
            userClaims[role] = true;
        });

        await admin.auth().setCustomUserClaims(userRecord.uid, userClaims);

        return userRecord;
    }

    async storeByGoogle(googleFirebaseUser: GoogleFirebaseUser, roles: string[]): Promise<void> {
        const userDTO = new StoreUserDTO();
        const googleFirebaseUserNames = googleFirebaseUser.name.split(' ');

        userDTO.email = googleFirebaseUser.email;
        userDTO.name = googleFirebaseUserNames[0];
        userDTO.photoURL = googleFirebaseUser.picture;
        userDTO.lastname = googleFirebaseUserNames.length >= 2 ? googleFirebaseUserNames[1] : '';
        userDTO.emailIsConfirmed = googleFirebaseUser.email_verified;
        userDTO.roles = roles;

        await this.setFirebaseUserRoles(googleFirebaseUser.uid, roles);

        await this.userModel.create({
            ...userDTO,
            firebaseId: googleFirebaseUser.uid,
        });
    }

    async updateThumbnail(uid: string, thumbnail: string): Promise<void> {
        this.logger.log(`Atualizando thumbnail do usuário ${uid}`);
        await admin.auth().updateUser(uid, {
            photoURL: thumbnail,
        });

        await this.update(uid, {
            photoURL: thumbnail,
        });
    }

    async inactivateUser(id: string): Promise<void> {
        const user = await this.getOne(id);

        await admin.auth().updateUser(user.firebaseId, {
            disabled: true,
        });
    }

    async activateUser(id: string): Promise<void> {
        const user = await this.getOne(id);

        await admin.auth().updateUser(user.firebaseId, {
            disabled: false,
        });
    }
}
