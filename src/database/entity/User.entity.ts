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
import { Session } from './Session.entity';
import { Area } from './Area.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column()
    firebaseId?: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    lastname: string;

    @ApiProperty()
    @Column({
        type: 'text',
        array: true,
    })
    roles?: string[];

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty({
        type: () => [ContextAnswer],
    })
    @OneToMany(() => ContextAnswer, (o) => o.user)
    contextAnswers?: string[] | ContextAnswer[];

    @ApiProperty({
        type: () => [Session],
        required: false,
    })
    @OneToMany(() => Session, (o) => o.user)
    sessions: Session[];

    @ApiProperty({
        type: () => Area,
    })
    @ManyToOne(() => Area, (o) => o.users, { onDelete: 'CASCADE', cascade: true })
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
