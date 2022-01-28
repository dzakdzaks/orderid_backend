import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
    @Prop({ required: true })
    name: String;

    @Prop()
    address?: String;

    @Prop()
    latitude?: number;

    @Prop()
    longitude?: number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);