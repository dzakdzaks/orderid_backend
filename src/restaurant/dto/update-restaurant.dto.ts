import { IsDate, IsNotEmpty } from "class-validator";
import { BaseRestaurantDto } from "./base-restaurant.dto";

export class UpdateRestaurantDto extends BaseRestaurantDto {
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date
}