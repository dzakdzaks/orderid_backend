import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BaseRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    code: string

    @IsString()
    @IsNotEmpty()
    address?: string

    @IsString()
    color?: string
    
    @IsNumber()
    latitude?: number

    @IsNumber()
    longitude?: number
}