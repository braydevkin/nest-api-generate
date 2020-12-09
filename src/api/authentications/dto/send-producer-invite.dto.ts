import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendProducerInviteInDTO {
    @IsEmail()
    @ApiProperty()
    email: string;
}
