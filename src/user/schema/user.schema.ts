import { Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {

}