import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/data/user/schema/user.schema";

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: User.name })
    owner: mongoose.Types.ObjectId;

    @Prop()
    name: string;

    @Prop({ unique: true })
    code: string;

    @Prop()
    address?: string;

    @Prop()
    color?: string;

    @Prop()
    imageUrl?: string;

    @Prop()
    posterUrl?: string;

    @Prop()
    latitude?: number;

    @Prop()
    longitude?: number;

    @Prop({ default: '' })
    pinnedMenuTitle?: string;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);