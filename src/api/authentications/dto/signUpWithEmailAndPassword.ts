import { validateOrReject, IsString, IsOptional, IsArray, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpWithEmailAndPasswordDTO {
    @ApiProperty()
    id?: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsString()
    name: string;

    @IsString()
    @ApiProperty()
    lastname: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    roles: string[];
}
