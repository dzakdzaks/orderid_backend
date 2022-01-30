import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
    _id: mongoose.Types.ObjectId

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    address?: string;

    @Prop()
    color?: string;

    @Prop()
    imageUrl?: string;

    @Prop()
    posterUrl?: string;

    @Prop()
    latitude?: number;

    @Prop()
    longitude?: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);