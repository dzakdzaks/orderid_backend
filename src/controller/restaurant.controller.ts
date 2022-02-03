import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateRestaurantDto } from 'src/data/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/data/restaurant/dto/update-restaurant.dto';
import { RestaurantService } from 'src/service/restaurant.service';
import * as mongoose from 'mongoose';
import { Restaurant } from 'src/data/restaurant/schema/restaurant.schema';
import { MenuCategoryService } from 'src/service/menu-category.service';
import { MenuService } from 'src/service/menu.service';

@Controller('api/restaurant')
export class RestaurantController {
    constructor(
        private readonly service: RestaurantService,
        private readonly menuCategoryService: MenuCategoryService,
        private readonly menuService: MenuService,
    ) { }

    @Get('get-restaurant')
    async getRestaurant(
        @Query('id') id: String,
        @Query('code') code: String
    ) {
        try {
            let restaurant: Restaurant
            if (code != null && code != '') {
                restaurant = await this.service.findOneByCode(code);
            } else if (id != null && id != '' && mongoose.isValidObjectId(id)) {
                restaurant = await this.service.findOneById(id);
            } else {
                throw new BadRequestException()
            }
            if (!restaurant) {
                throw new NotFoundException()
            }
            const menuCategories = await this.menuCategoryService.findByRestaurant(restaurant._id.toString(), 0)
            const menus = await this.menuService.findByRestaurant(restaurant._id.toString(), 0)
            const pinnedMenus = menus.filter((item) => {
                return item.isPinnedMenu == true
            })
            menuCategories.map((item) => {
                return item.menus = menus.filter((menu) => {
                    return menu.menuCategory == item._id
                })
            })
            return { restaurant, pinnedMenus, menuCategories }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get('all')
    async allRestaurant() {
        try {
            const restaurants = await this.service.findAll();
            if (!restaurants && restaurants.length == 0) {
                throw new NotFoundException();
            }
            return restaurants
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get('get-one')
    async find(
        @Query('id') id: String,
        @Query('code') code: String
    ) {
        try {
            let restaurant: Restaurant
            if (code != null && code != '') {
                restaurant = await this.service.findOneByCode(code);
            } else if (id != null && id != '' && mongoose.isValidObjectId(id)) {
                restaurant = await this.service.findOneById(id);
            } else {
                throw new BadRequestException()
            }
            if (!restaurant) {
                throw new NotFoundException();

            }
            return restaurant
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Post('create')
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        try {
            const restaurant = await this.service.create(createRestaurantDto);
            return restaurant
        } catch (error) {
            if (error.message.includes('code') && error.message.includes('to be unique')) {
                throw new BadRequestException('Code already exist, try another code')
            }
            throw new BadRequestException(error)
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            const restaurant = await this.service.update(id, updateRestaurantDto);
            return restaurant
        } catch (error) {
            if (error.message.includes('code')) {
                throw new BadRequestException('Code already exist, try another code')
            }
            throw new BadRequestException(error)
        }

    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            const restaurant = await this.service.delete(id);
            return restaurant
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
