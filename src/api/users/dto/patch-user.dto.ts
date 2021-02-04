import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UpdateUserDTO } from './update-user.dto';

export class PatchUserDTO extends PartialType(UpdateUserDTO) {
    @IsOptional()
    name: string;

    @IsOptional()
    lastname: string;

    @IsOptional()
    email: string;

    @IsOptional()
    photoURL?: string;

    @IsOptional()
    password: string;

    @IsOptional()
    emailIsConfirmed?: boolean;

    @IsOptional()
    roles: string[];

    @IsOptional()
    whatsapp?: string;
}
