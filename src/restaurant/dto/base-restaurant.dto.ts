import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BaseRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name: String

    @IsString()
    address?: String
    
    @IsNumber()
    latitude?: number

    @IsNumber()
    longitude?: number
}