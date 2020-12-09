import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    AfterLoad,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

import { Context } from './Context.entity';
import { DIALOGFLOWS_PATH } from '@/config/Constants';
import { User } from './User.entity';

@Entity()
export class Area extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
    })
    isActive?: boolean;

    @ApiProperty({
        required: false,
    })
    hasDialogflow: boolean;

    @ApiProperty({
        type: () => [Context],
        required: false,
    })
    @OneToMany(() => Context, (o) => o.area)
    contexts: Context[];

    @ApiProperty({
        type: () => [User],
        required: false,
    })
    @OneToMany(() => User, (o) => o.area)
    users: User[];

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
        select: false,
    })
    isDeleted?: boolean;

    @ApiProperty({
        required: false,
    })
    @CreateDateColumn({
        select: false,
    })
    createdAt?: Date;

    @ApiProperty({
        required: false,
    })
    @UpdateDateColumn({
        select: false,
    })
    updatedAt?: Date;

    getDialogflowPath(): string {
        return path.join(DIALOGFLOWS_PATH, this.name) + '.json';
    }

    @AfterLoad()
    afterLoad(): void {
        this.hasDialogflow = fs.existsSync(this.getDialogflowPath());
    }
}
