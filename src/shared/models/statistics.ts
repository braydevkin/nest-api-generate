import { ApiProperty } from '@nestjs/swagger';

export class Statistics {
    @ApiProperty()
    total: number;
}

export class CountDTO {
    total: number;
}
