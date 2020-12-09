import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationsService } from './authentications.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@/shared/auth/roles/roles.decorator';
import { FirebaseRolesGuard } from '@/shared/auth/firebase/firebase-roles.guard';
import { ROLES } from '@/config';
import { UsersService } from '../users/users.service';
import { StoreUserDTO } from '../users/dto/store-user.dto';
import { GoogleFirebaseUser } from '@/shared/models';

@ApiTags('authentications')
@Controller('authentications')
export class AuthenticationsController {
    constructor(private readonly service: AuthenticationsService, private readonly usersService: UsersService) { }

    @ApiCreatedResponse({
        description: 'Produtor cadastrado com sucesso.',
    })
    @Post('/sign-up-user')
    async signUpUser(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
        return await this.usersService.storeUser(storeUserDTO);
    }

    @ApiCreatedResponse({
        description: 'Produtor cadastrado com sucesso.',
    })
    @Post('/sign-up-producer')
    async signUpProducer(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
        return await this.usersService.storeProducer(storeUserDTO);
    }

    @ApiCreatedResponse({
        description: 'Administrador cadastrado com sucesso.',
    })
    @UseGuards(AuthGuard('firebase-auth'), FirebaseRolesGuard)
    @Roles([ROLES.ADMIN])
    @Post('/sign-up-admin')
    async signUpAdmin(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
        return await this.usersService.storeAdmin(storeUserDTO);
    }

    @ApiCreatedResponse({
        description: 'Administrador cadastrado com sucesso.',
    })
    @UseGuards(AuthGuard('firebase-auth'), FirebaseRolesGuard)
    @Roles([ROLES.ADMIN])
    @Post('/sign-up-suport')
    async signUpSupport(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
        return await this.usersService.storeSuport(storeUserDTO);
    }

    @UseGuards(AuthGuard('firebase-auth'), FirebaseRolesGuard)
    @Roles([])
    @Post('/sign-google-user')
    async SignClientWithGoogle(@Req() { user }: GoogleFirebaseUser): Promise<void> {
        return await this.usersService.storeUserByGoogle(user);
    }

    // TODO Descomentar para criar usuário MASTER ADMIN e depois comentar novamente
    // @ApiCreatedResponse({
    //     description: 'Administrador Master cadastrado com sucesso.',
    // })
    // @Post('/sign-up-master-admin')
    // async signUpMasterAdmin(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
    //     return await this.usersService.storeMasterAdmin(storeUserDTO);
    // }
}
