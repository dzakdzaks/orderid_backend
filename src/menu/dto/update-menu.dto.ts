import { IsDate, IsNotEmpty } from "class-validator";
import { BaseMenuDto } from "./base-menu.dto";

export class UpdateMenuDto extends BaseMenuDto {
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date
}