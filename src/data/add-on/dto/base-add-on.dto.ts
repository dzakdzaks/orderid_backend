import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { AddOnType } from "../schema/add-on.schema";

export class BaseAddOnDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    menu: string

    @IsEnum(AddOnType)
    @IsNotEmpty()
    type: AddOnType
}