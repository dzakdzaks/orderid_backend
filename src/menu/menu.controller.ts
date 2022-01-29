import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(
        private readonly service: MenuService
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
    async create(@Body() createMenuDto: CreateMenuDto) {
        return await this.service.create(createMenuDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: String, @Body() updateMenuDto: UpdateMenuDto) {
        return await this.service.update(id, updateMenuDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: String) {
        return await this.service.delete(id);
    }
}
