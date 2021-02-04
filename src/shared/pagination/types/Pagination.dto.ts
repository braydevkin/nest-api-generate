import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class PaginationDTO {
    @ApiProperty({
        required: false,
        type: Number,
    })
    @IsOptional()
    @Transform((value) => Number(value))
    @IsNumber()
    skip = 0;

    @ApiProperty({
        required: false,
        type: Number,
    })
    @IsOptional()
    @Transform((value) => Number(value))
    @IsNumber()
    limit = 10;
}
