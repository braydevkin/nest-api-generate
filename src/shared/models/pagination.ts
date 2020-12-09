import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export interface PaginationI {
    skip?: number;
    take?: number;
}

export class Pagination implements PaginationI {
    @ApiProperty({
        default: 0,
        nullable: true,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    skip?: number = 0;

    @ApiProperty({
        default: 10,
        nullable: true,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    take?: number = 10;
}
