import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AddOnItemDocument = AddOnItem & Document

@Schema()
export class AddOnItem {
    _id: Types.ObjectId

    @Prop({ require: true, unique: true })
    name: string

    @Prop({ required: true })
    price: number
}

export const AddOnItemSchema = SchemaFactory.createForClass(AddOnItem);