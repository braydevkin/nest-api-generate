import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdDTO {
    @ApiProperty()
    @IsString()
    id: string;
}
