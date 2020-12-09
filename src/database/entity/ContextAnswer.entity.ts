import {
    ManyToOne,
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './User.entity';
import { Context } from './Context.entity';

export type AnswerTypes = 'text' | 'image' | 'video' | 'audio';

export const PossibleAnswerTypes = ['text', 'image', 'video', 'audio'];
@Entity()
export class ContextAnswer extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    content: string;

    @ApiProperty({
        enum: PossibleAnswerTypes,
    })
    @Column({
        type: 'text',
    })
    type: AnswerTypes;

    @ApiProperty()
    @Column()
    order: number;

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
    })
    isActive?: boolean;

    @ApiProperty({
        type: () => Context,
    })
    @ManyToOne(() => Context, (o) => o.contextAnswers, { onDelete: 'CASCADE', cascade: true })
    context: string | Context;

    @ApiProperty({
        type: () => User,
    })
    @ManyToOne(() => User, (o) => o.contextAnswers, { onDelete: 'CASCADE', cascade: true })
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
}
