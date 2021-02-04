import { IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { optionalStringToDate } from '@/utils/ValidationUtils';

export class FilterUsersDTO {
    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsString()
    roles?: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsString()
    zoopId?: string;

    @ApiProperty({
        required: false,
        type: Date,
    })
    @IsOptional()
    @Transform((value) => optionalStringToDate(value))
    @IsDate()
    fromDate?: Date;

    @ApiProperty({
        required: false,
        type: Date,
    })
    @IsOptional()
    @Transform((value) => optionalStringToDate(value))
    @IsDate()
    toDate?: Date;
}
