import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUuid } from '../validations/IsUuid';

export class IdUuid {
    constructor(id: string) {
        this.id = id;
    }

    @ApiProperty()
    @Validate(IsUuid)
    id: string;
}
