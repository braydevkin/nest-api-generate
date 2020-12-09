import { validateOrReject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDTO {
    @ApiProperty()
    token: string;

    @ApiProperty()
    _id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    roles: string[];
}
