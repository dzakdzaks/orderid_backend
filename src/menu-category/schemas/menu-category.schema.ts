import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Restaurant } from "src/restaurant/schemas/restaurant.schema";

export type MenuCategoryDocument = MenuCategory & Document

@Schema({ timestamps: true })
export class MenuCategory {
    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Restaurant.name })
    restaurant: string;

    @Prop({ required: true})
    name: string;
}

export const MenuCategorySchema = SchemaFactory.createForClass(MenuCategory)