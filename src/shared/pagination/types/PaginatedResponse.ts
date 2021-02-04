import { ApiProperty } from '@nestjs/swagger';
import { PaginationInfos } from './PaginationInfos';

export class PaginatedResponse<T> {
    @ApiProperty({
        type: PaginationInfos,
    })
    pagination: PaginationInfos;

    results: T[];
}
