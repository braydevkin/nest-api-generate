import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateUserDTO, FilterUsersDTO } from './dto';
import { Logger } from '@shared/logger/Logger';
import { PaginationDTO } from '@shared/dto';
import { getValidAttributes } from '@/utils/ObjectUtils';
import * as admin from 'firebase-admin';
import { ROLES } from '@/config';
import { StoreUserDTO } from './dto/store-user.dto';
import { GoogleFirebaseUser, JSONObject } from '@/shared/models';
import { ListUsers } from './dto/list-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/database/entity/User.entity';
import { UpdateResult } from 'typeorm';
import { handleDateValidFilters } from '@/utils/TypeOrmUtils';
import { UserIncludesDTO } from './dto/users-includes.dto';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private logger: Logger,
    ) {
        this.logger.setContext(`${User.name}Service`);
    }

    handleIncludes(includes?: UserIncludesDTO): string[] {
        const relations: string[] = [];

        if (includes) {
            if (includes.includeContextAnswers === true) {
                relations.push('contextAnswers');
            }
            if (includes.includeSessions === true) {
                relations.push('sessions');
            }
        }

        return relations;
    }

    handleFilters(filters?: FilterUsersDTO): JSONObject {
        let validFilters = filters ? getValidAttributes(filters) : {};
        validFilters = handleDateValidFilters(validFilters);

        return validFilters;
    }

    async getAll(pagination: PaginationDTO, filters?: FilterUsersDTO, includes?: UserIncludesDTO): Promise<ListUsers> {
        this.logger.log(`Listando ${User.name}...`);

        const validFilters = this.handleFilters(filters);
        const relations = this.handleIncludes(includes);

        const total = await this.usersRepository.count({
            where: validFilters,
        });
        const users = this.usersRepository.find({
            where: validFilters,
            skip: Number(pagination.skip),
            take: Number(pagination.limit),
            relations: relations,
        });

        const result = new ListUsers();
        result.pagination = {
            skip: Number(pagination.skip),
            limit: Number(pagination.limit),
            total,
        };

        result.results = await users;

        return result;
    }
    async getOne(id: string, includes?: UserIncludesDTO): Promise<User> {
        this.logger.log(`Listando ${User.name} ${id}`);

        const relations = this.handleIncludes(includes);

        const user = await this.usersRepository.findOne(id, {
            relations: relations,
        });

        if (!user) {
            throw new HttpException(`${User.name} não encontrada`, HttpStatus.NOT_FOUND);
        }

        return await user;
    }

    async storeLocalUser(storeUserDTO: StoreUserDTO): Promise<void> {
        const firebaseUser = await this.storeFirebaseUser(storeUserDTO).catch((err) => {
            this.logger.error(`Erro ao cadastrar Usuário ${storeUserDTO.email} no Firebase`, err);
            throw err;
        });
        storeUserDTO.firebaseId = firebaseUser.uid;

        try {
            const user = await this.usersRepository.create(storeUserDTO);

            await this.usersRepository.save(user);
        } catch (err) {
            this.logger.error(`Erro ao cadastrar Usuário ${storeUserDTO.email}`, err);
            await admin.auth().deleteUser(firebaseUser.uid);
            throw err;
        }
    }

    async verifyIfExistsByEmail(email: string): Promise<boolean> {
        return (
            (await this.usersRepository.count({
                email,
            })) > 0
        );
    }

    async getOneByFirebaseId(uid: string): Promise<User> {
        this.logger.log(`Listando ${User.name} pelo Firebase ID ${uid}`);

        const user = await this.usersRepository.findOne({
            firebaseId: uid,
        });

        if (!user) {
            throw new HttpException(`${User.name} não encontrado`, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async getOneByEmailWithPassword(email: string): Promise<User> {
        this.logger.log(`Listando ${User.name} ${email}`);

        const user = await this.usersRepository.findOne({
            email,
        });

        if (!user) {
            throw new HttpException(`${User.name} não encontrado`, HttpStatus.NOT_FOUND);
        }

        return await user;
    }
    async update(id: string, updateDTO: UpdateUserDTO): Promise<UpdateResult> {
        this.logger.log(`Editando ${User.name} ${id}`);

        const validAttributes = getValidAttributes(updateDTO);

        await admin.auth().updateUser(id, {
            displayName: `${updateDTO.name} ${updateDTO.lastname}`,
        });

        const user = await this.getOne(id);
        return await this.usersRepository.update(
            {
                firebaseId: id,
            },
            {
                ...user,
                ...validAttributes,
            },
        );
    }

    async delete(id: string): Promise<void> {
        this.logger.log(`Removendo ${User.name} ${id}`);

        await admin.auth().updateUser(id, {
            disabled: true,
        });
        await this.usersRepository.update(
            {
                firebaseId: id,
            },
            {
                isDeleted: true,
            },
        );
    }

    async storeFirebaseUser(storeUserDTO: StoreUserDTO): Promise<admin.auth.UserRecord> {
        const userRecord = await admin.auth().createUser({
            email: storeUserDTO.email,
            password: storeUserDTO.password,
            displayName: `${storeUserDTO.name} ${storeUserDTO.lastname}`,
            emailVerified: !storeUserDTO.emailIsConfirmed ? false : storeUserDTO.emailIsConfirmed,
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

    async storeProducer(storeUserDTO: StoreUserDTO): Promise<void> {
        this.logger.log(`Cadastrando Produtor ${storeUserDTO.email}`);
        const exists = await this.verifyIfExistsByEmail(storeUserDTO.email);

        if (exists) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
        }
        storeUserDTO.emailIsConfirmed = true;
        storeUserDTO.roles = [ROLES.USER_HOTELARIA];

        await this.storeLocalUser(storeUserDTO);
    }

    async storeAdmin(storeUserDTO: StoreUserDTO): Promise<void> {
        this.logger.log(`Cadastrando Administrador ${storeUserDTO.email}`);
        const exists = await this.verifyIfExistsByEmail(storeUserDTO.email);

        if (exists) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
        }

        storeUserDTO.roles = [ROLES.ADMIN];

        await this.storeLocalUser(storeUserDTO);
    }

    async storeUser(storeUserDTO: StoreUserDTO): Promise<void> {
        this.logger.log(`Cadastrando User ${storeUserDTO.email}`);
        const exists = await this.verifyIfExistsByEmail(storeUserDTO.email);

        if (exists) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
        }

        storeUserDTO.roles = [ROLES.USER_HOTELARIA];

        await this.storeLocalUser(storeUserDTO);
    }

    async storeMasterAdmin(storeUserDTO: StoreUserDTO): Promise<void> {
        this.logger.log(`Cadastrando Administrador Master ${storeUserDTO.email}`);
        const exists = await this.verifyIfExistsByEmail(storeUserDTO.email);

        if (exists) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
        }

        storeUserDTO.roles = [ROLES.ADMIN];

        await this.storeLocalUser(storeUserDTO);
    }

    async storeSuport(storeUserDTO: StoreUserDTO): Promise<void> {
        this.logger.log(`Cadastrando usuário do suporte ${storeUserDTO.email}`);
        const exists = await this.verifyIfExistsByEmail(storeUserDTO.email);

        if (exists) {
            throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
        }

        storeUserDTO.roles = [ROLES.SUPPORT];

        await this.storeLocalUser(storeUserDTO);
    }

    async storeByGoogle(googleFirebaseUser: GoogleFirebaseUser, roles: string[]): Promise<void> {
        const userDTO = new StoreUserDTO();
        const googleFirebaseUserNames = googleFirebaseUser.name.split(' ');

        userDTO.email = googleFirebaseUser.email;
        userDTO.name = googleFirebaseUserNames[0];
        userDTO.lastname = googleFirebaseUserNames.length >= 2 ? googleFirebaseUserNames[1] : '';
        userDTO.emailIsConfirmed = googleFirebaseUser.email_verified;
        userDTO.firebaseId = googleFirebaseUser.uid;
        userDTO.roles = roles;

        const user = await this.usersRepository.create(userDTO);

        await this.usersRepository.save(user);
    }

    async storeUserByGoogle(googleFirebaseUser: GoogleFirebaseUser): Promise<void> {
        const roles = [ROLES.USER_HOTELARIA];
        const exists = await this.verifyIfExistsByEmail(googleFirebaseUser.email);
        if (exists !== true) {
            this.logger.log(`Cadastrando User ${googleFirebaseUser.email} usando o Google`);
            await this.storeByGoogle(googleFirebaseUser, roles);
            return;
        }
        this.logger.log(`Realizando login do User ${googleFirebaseUser.email} usando o Google`);
    }

    async updateThumbnail(uid: string, thumbnail: string): Promise<void> {
        this.logger.log(`Atualizando thumbnail do usuário ${uid}`);
        await admin.auth().updateUser(uid, {
            photoURL: thumbnail,
        });
    }

    async getCount(filters?: FilterUsersDTO): Promise<number> {
        this.logger.log(`Listando número de ${User.name}'s`);

        const validFilters = filters ? getValidAttributes(filters) : {};

        const total = await this.usersRepository.count({
            where: validFilters,
        });

        return total;
    }
}
