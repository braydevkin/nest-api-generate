import { IsString, IsOptional, IsBoolean, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class StoreUserDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    photoURL?: string;

    @ApiProperty()
    @IsString()
    @Length(6, 120)
    password: string;

    @ApiProperty({
        default: false,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    emailIsConfirmed?: boolean;

    @Exclude()
    roles: string[];

    @ApiProperty()
    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    whatsapp?: string;
}
