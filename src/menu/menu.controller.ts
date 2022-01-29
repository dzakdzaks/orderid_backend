import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';
import * as mongoose from 'mongoose';

@Controller('menu')
export class MenuController {
    constructor(
        private readonly service: MenuService
    ) {}

    @Get('all')
    async all(
        @Query('isPopulated') isPopulated: number
    ) {
        const menus = await this.service.findAll(isPopulated);
        if (!menus || menus.length == 0) {
            throw new NotFoundException()
        }
        return menus
    }

    @Get('get-by-menu-category/:id')
    async findByMenuCategory(
        @Param('id') menuCategoryId: String,
        @Query('isPopulated') isPopulated: number
    ) {
        if (!mongoose.isValidObjectId(menuCategoryId)) {
            throw new BadRequestException()
        }
        const menus = await this.service.findByMenuCategory(menuCategoryId, isPopulated);
        if (!menus || menus.length == 0) {
            throw new NotFoundException()
        }
        return menus
    }

    @Get(':id')
    async find(
        @Param('id') id: String,
        @Query('isPopulated') isPopulated: number
    ) {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException()
        }
        const menu = await this.service.findOne(id, isPopulated);
        if (!menu) {
            throw new NotFoundException()
        }
        return menu
    }

    @Post('create')
    async create(@Body() createMenuDto: CreateMenuDto) {
        return await this.service.create(createMenuDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuDto) {
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
