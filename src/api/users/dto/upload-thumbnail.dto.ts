import { ApiProperty } from '@nestjs/swagger';

export class UploadThumbnailDTO {
    @ApiProperty()
    thumbnailUrl: string;
}
