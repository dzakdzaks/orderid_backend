import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import * as mongoose from 'mongoose';
import { Request } from 'express';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly service: RestaurantService) {}

    @Get('all')
    async all(@Req() request: Request) {
        const restaurants = await this.service.findAll();
        if (restaurants && restaurants.length > 0) {
            return { restaurants }
        } else {
             throw new NotFoundException();
        }
    }

    @Get(':id')
    async find(@Param('id') id: String) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        const restaurant = await this.service.findOne(id);
        if (!restaurant) {
            throw new NotFoundException();
            
        }
        return { restaurant }
    }

    @Post('create')
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        const restaurant = await this.service.create(createRestaurantDto);
        return { restaurant }
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        const restaurant = await this.service.update(id, updateRestaurantDto);
        return { restaurant }
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
