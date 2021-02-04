import { ApiProperty } from '@nestjs/swagger';

export class PaginationInfos {
    @ApiProperty()
    total: number;

    @ApiProperty()
    skip: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    pages: number;
}
