import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { AddOn } from "src/data/add-on/schema/add-on.schema"

export class BaseMenuDto {
    @IsString()
    @IsNotEmpty()
    menuCategory: string

    @IsString()
    @IsNotEmpty()
    restaurant: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description?: string
    
    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    qty: number

    @IsBoolean()
    isPinnedMenu?: boolean

    @IsString()
    imageUrl?: string

    @IsArray()
    addOns?: AddOn[]
}