import { IsNotEmpty, IsString } from "class-validator";

export class BaseMenuCategoryDto {
    @IsString()
    @IsNotEmpty()
    restaurant: string

    @IsString()
    @IsNotEmpty()
    name: string
}