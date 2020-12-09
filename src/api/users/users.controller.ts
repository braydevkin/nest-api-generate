import {
    Controller,
    Get,
    Param,
    Body,
    Put,
    Delete,
    Query,
    UseGuards,
    UseInterceptors,
    UploadedFile,
    Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from '@database/entity/User.entity';
import { UpdateUserDTO, FilterUsersDTO } from './dto';
import { JwtAuthGuard } from '@shared/auth/jwt/jwt-auth.guard';
import { PaginationDTO } from '@shared/dto';
import { SelfOrMasterAdminGuard } from '@/shared/auth/selfOrMasterAdmin/selfOrMasterAdmin.guard';
import { FirebaseSelfOrMasterAdminGuard } from '@/shared/auth/firebase/selfOrMasterAdmin.guard';
import { AuthGuard } from '@nestjs/passport';
import { ListUsers } from './dto/list-users.dto';
import { FirebaseRolesGuard } from '@/shared/auth/firebase/firebase-roles.guard';
import multerS3 from '@/shared/fileUpload/multerS3';
import { FileInterceptor } from '@nestjs/platform-express';
import { CountDTO } from '@/shared/models/statistics';
import { IdUuid } from '@/shared/dto/Uuid.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @ApiOkResponse({
        description: 'Usuários obtidas com sucesso.',
        type: ListUsers,
    })
    @Get('/')
    async getAll(@Query() pagination: PaginationDTO, @Query() filters: FilterUsersDTO): Promise<ListUsers> {
        return await this.service.getAll(pagination, filters);
    }

    @ApiOkResponse({
        description: 'Usuário obtida com sucesso.',
        type: User,
    })
    @Get(':id')
    async getOne(@Param() { id }: IdUuid): Promise<User> {
        return this.service.getOneByFirebaseId(id);
    }

    @ApiOkResponse({
        description: 'Usuário editada com sucesso.',
        type: User,
    })
    @UseGuards(AuthGuard('firebase-auth'), FirebaseSelfOrMasterAdminGuard)
    @Put(':id')
    async update(@Param() { id }: IdUuid, @Body() updateDTO: UpdateUserDTO): Promise<UpdateResult> {
        return this.service.update(id, updateDTO);
    }

    @ApiOkResponse({
        description: 'Usuário removida com sucesso.',
    })
    @UseGuards(JwtAuthGuard, SelfOrMasterAdminGuard)
    @Delete(':id')
    async delete(@Param() { id }: IdUuid): Promise<void> {
        return this.service.delete(id);
    }

    @ApiOkResponse({
        description: 'Usuário removida com sucesso.',
    })
    @UseGuards(JwtAuthGuard, SelfOrMasterAdminGuard)
    @Delete(':id')
    async storeProducer(@Param() { id }: IdUuid): Promise<void> {
        return this.service.delete(id);
    }

    @UseGuards(AuthGuard('firebase-auth'), FirebaseRolesGuard)
    // @Roles([ROLES.MASTERADMIN])
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('thumbnail', multerS3))
    @Post(':ui/thumbnail/upload')
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async updateThumbnail(@Param() { id }: IdUuid, @UploadedFile() thumbnail): Promise<void> {
        const thumbnailUrl = thumbnail.location;

        await this.service.updateThumbnail(id, thumbnailUrl);
    }

    @ApiOkResponse({
        description: 'Estatisticas dos usuários obtidas com sucesso.',
        type: CountDTO,
    })
    @Get('/statistics/count')
    async getStatistics(@Query() filters: FilterUsersDTO): Promise<CountDTO> {
        return {
            total: await this.service.getCount(filters),
        };
    }
}
