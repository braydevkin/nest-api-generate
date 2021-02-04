import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
    @ApiProperty()
    @Prop({
        type: String,
        unique: true,
        required: false,
    })
    firebaseId?: string;

    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    photoURL?: string;

    @ApiProperty()
    @Prop()
    lastname: string;

    @ApiProperty()
    @Prop({
        type: [String],
        default: [],
    })
    roles?: string[];

    @ApiProperty()
    @Prop({
        type: String,
        unique: true,
    })
    email: string;

    @ApiProperty({
        required: false,
        default: false,
    })
    @Prop({
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @ApiProperty()
    @Prop({
        required: false,
        default: () => Date.now(),
    })
    createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
