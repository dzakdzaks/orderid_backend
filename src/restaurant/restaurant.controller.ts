import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/utility/transform.interceptor';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly service: RestaurantService) {}

    @Get('all')
    async all() {
        const restaurants = await this.service.findAll();
        if (restaurants && restaurants.length > 0) {
            return { restaurants }
        } else {
             throw new NotFoundException();
        }
    }

    @Get(':id')
    async find(@Param('id') id: String) {
        const restaurant = await this.service.findOne(id);
        if (restaurant) {
            return { restaurant }
        } else {
             throw new NotFoundException();
        }
    }

    @Post('create')
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        const restaurant = await this.service.create(createRestaurantDto);
        return { restaurant }
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        const restaurant = await this.service.update(id, updateRestaurantDto);
        return { restaurant }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        const restaurant = await this.service.delete(id);
        return { restaurant }
    }
}
