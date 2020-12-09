import { Validate, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from '@/shared/validations/IsObjectId';

export class RecoveryPasswordDTO {
    @Validate(IsObjectId)
    @ApiProperty()
    recoveryPassword: string;

    @ApiProperty()
    @IsString()
    password: string;
}
