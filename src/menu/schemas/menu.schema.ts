import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { MenuCategory } from "src/menu-category/schemas/menu-category.schema";

export type MenuDocument = Menu & Document

@Schema({ timestamps: true })
export class Menu {
    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: MenuCategory.name })
    menuCategory: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    qty: number;

    @Prop({ default: false })
    isRecommended: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);