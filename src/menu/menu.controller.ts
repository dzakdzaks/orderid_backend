import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import * as mongoose from 'mongoose';

@Controller('api/menu')
export class MenuController {
    constructor(
        private readonly service: MenuService
    ) { }

    @Get('all')
    async all(
        @Query('isPopulated') isPopulated: number
    ) {
        try {
            const menus = await this.service.findAll(isPopulated);
            if (!menus || menus.length == 0) {
                throw new NotFoundException()
            }
            return menus
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get('get-by-restaurant/:id')
    async findByRestaurant(
        @Param('id') restaurantId: String,
        @Query('isPopulated') isPopulated: number
    ) {
        try {
            if (!mongoose.isValidObjectId(restaurantId)) {
                throw new BadRequestException()
            }
            const menus = await this.service.findByRestaurant(restaurantId, isPopulated);
            if (!menus || menus.length == 0) {
                throw new NotFoundException()
            }
            return menus
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get('get-by-menu-category/:id')
    async findByMenuCategory(
        @Param('id') menuCategoryId: String,
        @Query('isPopulated') isPopulated: number
    ) {
        try {
            if (!mongoose.isValidObjectId(menuCategoryId)) {
                throw new BadRequestException()
            }
            const menus = await this.service.findByMenuCategory(menuCategoryId, isPopulated);
            if (!menus || menus.length == 0) {
                throw new NotFoundException()
            }
            return menus
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get(':id')
    async find(
        @Param('id') id: String,
        @Query('isPopulated') isPopulated: number
    ) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            const menu = await this.service.findOne(id, isPopulated);
            if (!menu) {
                throw new NotFoundException()
            }
            return menu
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Post('create')
    async create(@Body() createMenuDto: CreateMenuDto) {
        try {
            return await this.service.create(createMenuDto);
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuDto) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            return await this.service.update(id, updateMenuDto);
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            return await this.service.delete(id);
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
