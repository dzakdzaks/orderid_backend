import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Menu } from "src/data/menu/schema/menu.schema";
import { AddOn } from "./add-on.schema";

export type AddOnItemDocument = AddOnItem & Document

@Schema({ timestamps: true })
export class AddOnItem {
    _id: Types.ObjectId

    @Prop({ required: true, type: Types.ObjectId, ref: AddOn.name })
    addOn: Types.ObjectId

    @Prop({ required: true, type: Types.ObjectId, ref: Menu.name })
    menu: Types.ObjectId

    @Prop({ require: true })
    name: string

    @Prop({ required: true })
    price: number
}

export const AddOnItemSchema = SchemaFactory.createForClass(AddOnItem);