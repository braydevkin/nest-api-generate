import { IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { optionalStringToBoolean } from '@/utils/ValidationUtils';

export class UserIncludesDTO {
    @ApiProperty({
        required: false,
        type: Boolean,
    })
    @IsOptional()
    @Transform((value) => optionalStringToBoolean(value))
    @IsBoolean()
    includeContextAnswers?: boolean;

    @ApiProperty({
        required: false,
        type: Boolean,
    })
    @IsOptional()
    @Transform((value) => optionalStringToBoolean(value))
    @IsBoolean()
    includeSessions?: boolean;
}
