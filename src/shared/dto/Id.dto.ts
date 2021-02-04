import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from '@/shared/validations/types/IsObjectId';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class IdDTO {
    @ApiProperty()
    @Validate(IsObjectId)
    @Transform((value) => new Types.ObjectId(value))
    id: Types.ObjectId;
}
