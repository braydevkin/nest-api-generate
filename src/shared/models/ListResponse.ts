import { ApiProperty } from '@nestjs/swagger';

export class PaginationInfos {
    @ApiProperty()
    total: number;

    @ApiProperty()
    skip: number;

    @ApiProperty()
    limit: number;
}

export class ListResponse<T> {
    @ApiProperty({
        type: PaginationInfos,
    })
    pagination: PaginationInfos;

    @ApiProperty()
    results: T[];
}
