import { validateOrReject, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    stripeId?: string;

    firebaseId?: string;

    async validate(): Promise<void> {
        await validateOrReject(this);
    }
}
