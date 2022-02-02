import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { AddOn } from "src/data/add-on/schema/add-on.schema";
import { MenuCategory } from "src/data/menu-category/schema/menu-category.schema";
import { Restaurant } from "src/data/restaurant/schema/restaurant.schema";

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

    @Prop({ default: '' })
    description?: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    qty: number;

    @Prop({ default: false })
    isPinnedMenu?: boolean;

    @Prop()
    imageUrl?: string;

    @Prop()
    addOns?: AddOn[]
}

export const MenuSchema = SchemaFactory.createForClass(Menu);