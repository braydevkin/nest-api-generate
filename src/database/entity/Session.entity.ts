import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './User.entity';

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    uniqueName: string;

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
        select: false,
    })
    isConnected?: boolean;

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
    })
    keepAlive?: boolean;

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
    })
    isDialogFlowActive?: boolean;

    @ApiProperty({
        type: () => User,
    })
    @ManyToOne(() => User, (o) => o.sessions, { onDelete: 'CASCADE', cascade: true })
    user: string | User;

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

    getUserId(): string {
        return typeof this.user === 'string' ? this.user : this.user.id;
    }
}
