import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseMenuCategoryDto } from './dto/base-menu-category.dto';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategoryService } from './menu-category.service';

@Controller('menu-category')
export class MenuCategoryController {
    constructor(
        private readonly service: MenuCategoryService
    ) {}

    @Get('all')
    async all() {
        return await this.service.findAll();
    }

    @Get('all-populate')
    async allPopulate() {
        return await this.service.findPopulate();
    }

    @Get(':id')
    async find(@Param('id') id: String) {
        return await this.service.findOne(id);
    }

    @Get(':id/populate')
    async findPopulate(@Param('id') id: String) {
        return await this.service.findOnePopulate(id);
    }

    @Post('create')
    async create(@Body() createMenuDto: CreateMenuCategoryDto) {
        return await this.service.create(createMenuDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuCategoryDto) {
        return await this.service.update(id, updateMenuDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        return await this.service.delete(id);
    }
}
