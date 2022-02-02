import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

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
}