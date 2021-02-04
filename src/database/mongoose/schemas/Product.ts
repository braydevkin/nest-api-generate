import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Product extends Document {
    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    price?: boolean;

    @ApiProperty()
    @Prop({
        required: false,
        default: () => Date.now(),
    })
    createdAt?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
