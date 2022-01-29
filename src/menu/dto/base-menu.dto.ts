import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BaseMenuDto {
    @IsString()
    @IsNotEmpty()
    menuCategory: string

    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    qty: number

    @IsBoolean()
    isRecommended: boolean
}