import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Menu } from "../menu/schema/menu.schema";
import { Restaurant } from "../restaurant/schema/restaurant.schema";

export type OrderDocument = Order & Document

@Schema({ timestamps: true })
export class Order {
    _id: Types.ObjectId

    @Prop({ required: true, type: Types.ObjectId, ref: Restaurant.name })
    restaurant: Types.ObjectId;

    @Prop({ required: true })
    menus: Menu[]

    @Prop({ required: true })
    userOrderId: string

    @Prop({ required: true })
    userCashierId: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)