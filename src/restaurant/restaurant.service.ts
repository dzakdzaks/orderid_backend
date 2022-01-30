import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectModel(Restaurant.name) 
        private readonly model: Model<RestaurantDocument>
    ) {}

    async findAll(): Promise<Restaurant[]> {
        return await this.model.find().exec();
    }

    async findOne(code: String): Promise<Restaurant> {
        return await this.model.findOne({ 'code': code }).exec()
    }

    async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        return await new this.model({
            ...createRestaurantDto
        }).save();
    }

    async update(id: String, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        return await this.model.findByIdAndUpdate(id, updateRestaurantDto).exec();
    }

    async delete(id: String): Promise<Restaurant> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
