import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from '@/shared/validations/types/IsObjectId';

export class IdDTO {
    constructor(id: string) {
        this.id = id;
    }

    @ApiProperty()
    @Validate(IsObjectId)
    id: string;
}
