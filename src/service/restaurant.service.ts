import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from 'src/data/restaurant/schema/restaurant.schema';
import { CreateRestaurantDto } from '../data/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../data/restaurant/dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectModel(Restaurant.name) 
        private readonly model: Model<RestaurantDocument>
    ) {}

    async findAll(): Promise<Restaurant[]> {
        return await this.model.find().exec();
    }

    async findOneById(id: String): Promise<Restaurant> {
        return await this.model.findById(id).exec()
    }

    async findOneByCode(code: String): Promise<Restaurant> {
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
