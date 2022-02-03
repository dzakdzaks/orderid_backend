import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Menu } from "src/data/menu/schema/menu.schema";
import { AddOnItemDocument, AddOnItemSchema } from "./add-on-item.schema";

export enum AddOnType {
    single = 'single',
    multiple = 'multiple'
}

export type AddOnDocument = AddOn & Document

@Schema({ timestamps: true })
export class AddOn {
    _id: Types.ObjectId

    @Prop({ require: true, unique: true })
    name: string

    @Prop({ required: true, type: Types.ObjectId, ref: Menu.name })
    menu: Types.ObjectId

    @Prop({ require: true })
    type: AddOnType

    @Prop({
        type: [
            AddOnItemSchema
        ]
    })
    addOnItems?: AddOnItemDocument[]
}

export const AddOnSchema = SchemaFactory.createForClass(AddOn);