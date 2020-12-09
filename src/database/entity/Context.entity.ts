import {
    OneToMany,
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ContextAnswer } from './ContextAnswer.entity';
import { Area } from './Area.entity';

@Entity()
export class Context extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty({
        required: false,
    })
    @Column({
        nullable: true,
    })
    question?: string;

    @ApiProperty({
        required: false,
    })
    @Column({
        default: false,
    })
    isActive?: boolean;

    @ApiProperty({
        type: () => [ContextAnswer],
    })
    @OneToMany(() => ContextAnswer, (o) => o.context)
    contextAnswers?: string[] | ContextAnswer[];

    @ApiProperty({
        type: () => Area,
    })
    @ManyToOne(() => Area, (o) => o.contexts, { onDelete: 'CASCADE', cascade: true })
    area: string | Area;

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
