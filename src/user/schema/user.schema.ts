import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Restaurant } from "src/restaurant/schema/restaurant.schema";

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    _id: mongoose.Types.ObjectId

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    uid: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: Restaurant.name })
    restaurant?: mongoose.Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(User);