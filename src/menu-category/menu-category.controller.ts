import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategoryService } from './menu-category.service';
import * as mongoose from 'mongoose';

@Controller('menu-category')
export class MenuCategoryController {
    constructor(
        private readonly service: MenuCategoryService
    ) {}

    @Get('all')
    async all(
        @Query('isPopulated') isPopulated: number
    ) {
        const menuCategory = await this.service.findAll(isPopulated);
        if (!menuCategory || menuCategory.length == 0) {
            throw new NotFoundException();
        }
        return { menuCategory }
    }

    @Get('get-by-restaurant/:id')
    async findByRestaurant(
        @Param('id') restaurantId: String,
        @Query('isPopulated') isPopulated: number
    ) {
        if (!mongoose.isValidObjectId(restaurantId)) {
            throw new BadRequestException()
        }
        const menuCategories = await this.service.findByRestaurant(restaurantId, isPopulated);
        if (!menuCategories || menuCategories.length == 0) {
            throw new NotFoundException();
        }
        return { menuCategories }
    }

    @Get(':id')
    async find(
        @Param('id') id: String,
        @Query('isPopulated') isPopulated: number
    ) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        const menuCategory = await this.service.findOne(id, isPopulated);
        if (!menuCategory) {
            throw new NotFoundException();
        }
        return { menuCategory }
    }

    @Post('create')
    async create(@Body() createMenuDto: CreateMenuCategoryDto) {
        return await this.service.create(createMenuDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuCategoryDto) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        return await this.service.update(id, updateMenuDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        return await this.service.delete(id);
    }
}
