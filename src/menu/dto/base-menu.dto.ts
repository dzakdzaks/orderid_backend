import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BaseMenuDto {
    @IsString()
    @IsNotEmpty()
    restaurant: String

    @IsString()
    @IsNotEmpty()
    name: String
    
    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    qty: number
}