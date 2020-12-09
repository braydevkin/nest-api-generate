import { User } from '@/database/entity/User.entity';
import { ListResponse } from '@/shared/models';
import { ApiProperty } from '@nestjs/swagger';

export class ListUsers extends ListResponse<User> {
    @ApiProperty({
        type: [User],
    })
    results: User[];
}
