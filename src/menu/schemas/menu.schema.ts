import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Restaurant } from "src/restaurant/schemas/restaurant.schema";

export type MenuDocument = Menu & Document

@Schema()
export class Menu {
    @Prop({ required: true, ref: Restaurant.name })
    restaurant: String;

    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    qty: number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);