import { BaseAddOnDto } from "./base-add-on.dto";
import { IsArray, IsNotEmpty } from "class-validator";
import { AddOnItem } from "../schema/add-on-item.schema";

export class CreateAddOnDto extends BaseAddOnDto {
    @IsArray()
    @IsNotEmpty()
    addOnItems: AddOnItem[]
}