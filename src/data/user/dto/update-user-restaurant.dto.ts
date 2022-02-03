import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserRestaurantDto {
    @IsString()
    @IsNotEmpty()
    restaurant?: string
}