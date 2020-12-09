import { validateOrReject, IsString, IsOptional, IsArray, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @IsString()
    @ApiProperty()
    lastname: string;

    @ApiProperty({
        required: false,
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    roles: string[];

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}
