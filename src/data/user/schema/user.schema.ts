import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Restaurant } from "src/data/restaurant/schema/restaurant.schema";
import { Exclude } from "class-transformer";

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    _id: mongoose.Types.ObjectId

    @Prop({ unique: true })
    email: string;

    @Prop({ unique: true })
    uid: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: '' })
    password: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: Restaurant.name })
    restaurant?: mongoose.Types.ObjectId;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);