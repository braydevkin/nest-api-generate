import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendRecoveryPasswordDTO {
    @IsEmail()
    @ApiProperty()
    email: string;
}
