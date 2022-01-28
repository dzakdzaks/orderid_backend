import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@Controller('menus')
export class MenuController {
    constructor(
        private readonly service: MenuService
    ) {}

    @Get()
    async all() {
        return await this.service.findAll();
    }

    @Get('populate')
    async allPopulate() {
        return await this.service.findPopulate();
    }

    @Get(':id')
    async find(@Param('id') id: String) {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() createMenuDto: CreateMenuDto) {
        return await this.service.create(createMenuDto);
    }

    @Put(':id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuDto) {
        return await this.service.update(id, updateMenuDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: String) {
        return await this.service.delete(id);
    }

}
