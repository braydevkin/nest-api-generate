import { validateOrReject, IsString, IsOptional, IsBoolean, IsEmail, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreUserDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastname: string;

    firebaseId: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    password: string;

    @ApiProperty({
        default: false,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    emailIsConfirmed?: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    roles: string[];

    @ApiProperty({
        required: false,
    })
    @IsString()
    @IsOptional()
    whatsapp?: string;

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
