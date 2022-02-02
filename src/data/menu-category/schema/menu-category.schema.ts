import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Menu } from "src/data/menu/schema/menu.schema";
import { Restaurant } from "src/data/restaurant/schema/restaurant.schema";

export type MenuCategoryDocument = MenuCategory & Document

@Schema({ timestamps: true })
export class MenuCategory {
    _id: mongoose.Types.ObjectId

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Restaurant.name })
    restaurant: mongoose.Types.ObjectId;

    @Prop({ required: true})
    name: string;

    @Prop()
    menus?: Menu[]
}

export const MenuCategorySchema = SchemaFactory.createForClass(MenuCategory)