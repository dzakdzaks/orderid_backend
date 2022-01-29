import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private readonly service: RestaurantService) {}

    @Get('all')
    async all() {
        return await this.service.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: String) {
        return await this.service.findOne(id);
    }

    @Post('create')
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        return await this.service.create(createRestaurantDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return await this.service.update(id, updateRestaurantDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        return await this.service.delete(id);
    }
}
