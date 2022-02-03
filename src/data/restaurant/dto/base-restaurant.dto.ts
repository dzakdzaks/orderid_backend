import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BaseRestaurantDto {
    @IsString()
    name: string

    @IsString()
    code: string

    @IsString()
    address?: string

    @IsString()
    color?: string

    @IsString()
    imageUrl?: string

    @IsString()
    posterUrl?: string
    
    @IsNumber()
    latitude?: number

    @IsNumber()
    longitude?: number

    @IsString()
    pinnedMenuTitle?: string
}