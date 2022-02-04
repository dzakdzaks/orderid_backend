import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { Document, Types } from "mongoose";
import { Menu } from "src/data/menu/schema/menu.schema";
import { AddOnItem } from "./add-on-item.schema";

export enum AddOnType {
    single = 'single',
    multiple = 'multiple'
}

export type AddOnDocument = AddOn & Document

@Schema({ timestamps: true })
export class AddOn {
    _id: Types.ObjectId

    @Prop({ require: true })
    name: string

    @Prop({ required: true, type: Types.ObjectId, ref: Menu.name })
    menu: Types.ObjectId

    @Prop({ require: true })
    type: AddOnType

    @Prop()
    addOnItems?: AddOnItem[]
}

export const AddOnSchema = SchemaFactory.createForClass(AddOn);