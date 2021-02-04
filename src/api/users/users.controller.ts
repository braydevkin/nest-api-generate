import {
    Controller,
    Get,
    Param,
    Body,
    Put,
    Delete,
    Query,
    UseInterceptors,
    UploadedFile,
    Post,
    Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from '@mongoose/schemas/User';
import { UpdateUserDTO, FilterUsersDTO, UserIncludesDTO, PatchUserDTO } from './dto';
import multerS3 from '@/shared/fileUpload/multerS3';
import { FileInterceptor } from '@nestjs/platform-express';
import { ROLES } from '@/config/Constants';
import { S3UploadedFile } from '@/shared/fileUpload/types/S3UploadedFile';
import { ApiPaginatedResult } from '@/shared/pagination';
import { PaginatedResponse } from '@/shared/pagination/types';
import { IdDTO } from './dto/Id.dto';
import { FirebaseAuth } from '@/shared/auth/firebase/decorators';
import { PaginationDTO } from '@/shared/pagination/types/Pagination.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @ApiPaginatedResult(User, { description: 'Usuários obtidas com sucesso.' })
    @FirebaseAuth([ROLES.ADMIN, ROLES.MASTER_ADMIN])
    @Get('/')
    async getAll(
        @Query() pagination: PaginationDTO,
        @Query() filters: FilterUsersDTO,
        @Query() includes: UserIncludesDTO,
    ): Promise<PaginatedResponse<User>> {
        return await this.service.getAll(pagination, filters, includes);
    }

    @ApiOkResponse({
        description: 'Usuário obtida com sucesso.',
        type: User,
    })
    @FirebaseAuth()
    @Get(':id')
    async getOne(@Param('id') id: string, @Query() includes: UserIncludesDTO): Promise<User> {
        return this.service.getOne(id, includes);
    }

    @ApiOkResponse({
        description: 'Usuário editada com sucesso.',
        type: User,
    })
    @FirebaseAuth()
    @Put(':id')
    async update(@Param() { id }: IdDTO, @Body() updateDTO: UpdateUserDTO): Promise<User> {
        return this.service.update(id, updateDTO);
    }

    @ApiOkResponse({
        description: 'Usuário editada com sucesso.',
        type: User,
    })
    @FirebaseAuth()
    @Patch(':id')
    async patch(@Param() { id }: IdDTO, @Body() updateDTO: PatchUserDTO): Promise<User> {
        return this.service.update(id, updateDTO);
    }

    @ApiOkResponse({
        description: 'Usuário removida com sucesso.',
    })
    @FirebaseAuth()
    @Delete(':id')
    async delete(@Param() { id }: IdDTO): Promise<void> {
        return this.service.delete(id);
    }

    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('thumbnail', multerS3))
    @FirebaseAuth()
    @Post(':id/thumbnail/upload')
    async updateThumbnail(@Param() { id }: IdDTO, @UploadedFile() thumbnail: S3UploadedFile): Promise<void> {
        const thumbnailUrl = thumbnail.location;

        return await this.service.updateThumbnail(id, thumbnailUrl);
    }

    @FirebaseAuth([ROLES.MASTER_ADMIN, ROLES.ADMIN])
    @Post(':id/inactivate')
    async inactivateUser(@Param() { id }: IdDTO): Promise<void> {
        return await this.service.inactivateUser(id);
    }

    @FirebaseAuth([ROLES.MASTER_ADMIN, ROLES.ADMIN])
    @Post(':id/activate')
    async activateUser(@Param() { id }: IdDTO): Promise<void> {
        return await this.service.activateUser(id);
    }
}
