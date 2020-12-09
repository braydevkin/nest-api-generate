import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterUsersDTO {
    @ApiProperty({
        required: false,
    })
    @IsOptional()
    @IsString()
    roles?: string;
}
