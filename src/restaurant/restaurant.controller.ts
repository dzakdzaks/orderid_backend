import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import * as mongoose from 'mongoose';
import { Restaurant } from './schema/restaurant.schema';

@Controller('api/restaurant')
export class RestaurantController {
    constructor(private readonly service: RestaurantService) {}

    @Get('all')
    async all() {
        const restaurants = await this.service.findAll();
        if (!restaurants && restaurants.length == 0) {
            throw new NotFoundException();
        }
        return restaurants
    }

    @Get('get-one')
    async find(
        @Query('id') id: String,
        @Query('code') code: String
    ) {
        let restaurant: Restaurant
        if (code != null && code != '') {
            restaurant = await this.service.findOneByCode(code);
        } else if (id != null && id != '') {
            restaurant = await this.service.findOneById(id);
        } else {
            throw new BadRequestException()
        }
        if (!restaurant) {
            throw new NotFoundException();
            
        }
        return restaurant
    }

    @Post('create')
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        try {
            const restaurant = await this.service.create(createRestaurantDto);
            return restaurant
        } catch(error) {
            if (error.message.includes('code')) {
                throw new BadRequestException('Code already exist, try another code')
            }
            throw new BadRequestException(error)
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        try {
            const restaurant = await this.service.update(id, updateRestaurantDto);
            return restaurant
        } catch(error) {
            if (error.message.includes('code')) {
                throw new BadRequestException('Code already exist, try another code')
            }
            throw new BadRequestException(error)
        }
        
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        const restaurant = await this.service.delete(id);
        return { restaurant }
    }
}
