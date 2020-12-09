import { optionalStringToDate } from '@/utils/ValidationUtils';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DateFiltersDTO {
    @ApiProperty({
        required: false,
        type: Date,
    })
    @IsOptional()
    @Transform((value) => optionalStringToDate(value))
    @IsDate()
    startDate?: Date;

    @ApiProperty({
        required: false,
        type: Date,
    })
    @IsOptional()
    @Transform((value) => optionalStringToDate(value))
    @IsDate()
    endDate?: Date;
}
