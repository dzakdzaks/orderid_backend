import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { MenuCategory } from "src/menu-category/schemas/menu-category.schema";
import { Restaurant } from "src/restaurant/schemas/restaurant.schema";

export type MenuDocument = Menu & Document

@Schema({ timestamps: true })
export class Menu {
    _id: mongoose.Types.ObjectId

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: MenuCategory.name })
    menuCategory: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Restaurant.name })
    restaurant: mongoose.Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    qty: number;

    @Prop({ default: false })
    isRecommended: boolean;

    @Prop()
    imageUrl?: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);