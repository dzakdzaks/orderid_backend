import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateMenuCategoryDto } from 'src/data/menu-category/dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from 'src/data/menu-category/dto/update-menu-category.dto';
import { MenuCategoryService } from 'src/service/menu-category.service';

@Controller('api/menu-category')
export class MenuCategoryController {
    constructor(
        private readonly service: MenuCategoryService
    ) { }

    @Get('all')
    async all(
        @Query('isPopulated') isPopulated: number
    ) {
        try {
            const menuCategory = await this.service.findAll(isPopulated);
            if (!menuCategory || menuCategory.length == 0) {
                throw new NotFoundException();
            }
            return menuCategory
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
            const menuCategories = await this.service.findByRestaurant(restaurantId, isPopulated);
            if (!menuCategories || menuCategories.length == 0) {
                throw new NotFoundException();
            }
            return menuCategories
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
            const menuCategory = await this.service.findOne(id, isPopulated);
            if (!menuCategory) {
                throw new NotFoundException();
            }
            return menuCategory
        } catch (error) {
            throw new BadRequestException(error)
        }

    }

    @Post('create')
    async create(@Body() createMenuDto: CreateMenuCategoryDto) {
        try {
            return await this.service.create(createMenuDto);
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Patch('update/:id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuCategoryDto) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            return await this.service.update(id, updateMenuDto);
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Post('delete/:id')
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
