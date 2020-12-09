import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UIdUuid {
    constructor(uid: string) {
        this.uid = uid;
    }

    @ApiProperty()
    @IsString()
    uid: string;
}
