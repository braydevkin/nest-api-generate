import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@/shared/auth/roles/roles.decorator';
import { FirebaseRolesGuard } from '@/shared/auth/firebase/firebase-roles.guard';
import { ROLES } from '@/config';
import { UsersService } from '../users/users.service';
import { StoreUserDTO } from '../users/dto/store-user.dto';
import { GoogleFirebaseUser } from '@/shared/types';

@ApiTags('authentications')
@Controller('authentications')
export class AuthenticationsController {
    constructor(private readonly usersService: UsersService) {}

    @ApiCreatedResponse({
        description: 'Produtor cadastrado com sucesso.',
    })
    @Post('/sign-up-user')
    async signUpUser(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
        return await this.usersService.storeUser(storeUserDTO, [ROLES.USER]);
    }

    @ApiCreatedResponse({
        description: 'Administrador cadastrado com sucesso.',
    })
    @UseGuards(AuthGuard('firebase-auth'), FirebaseRolesGuard)
    @Roles([ROLES.MASTER_ADMIN])
    @Post('/sign-up-admin')
    async signUpAdmin(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
        return await this.usersService.storeUser(storeUserDTO, [ROLES.ADMIN]);
    }

    @UseGuards(AuthGuard('firebase-auth'), FirebaseRolesGuard)
    @Roles([])
    @Post('/sign-google-user')
    async SignClientWithGoogle(@Req() { user }: GoogleFirebaseUser): Promise<void> {
        return await this.usersService.storeByGoogle(user, [ROLES.USER]);
    }

    // TODO Descomentar para criar usuário MASTER ADMIN e depois comentar novamente
    // @ApiCreatedResponse({
    //     description: 'Administrador Master cadastrado com sucesso.',
    // })
    // @Post('/sign-up-master-admin')
    // async signUpMasterAdmin(@Body() storeUserDTO: StoreUserDTO): Promise<void> {
    //     return await this.usersService.storeUser(storeUserDTO, [ROLES.MASTER_ADMIN, ROLES.ADMIN]);
    // }
}
