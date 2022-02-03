import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateAddOnDto } from "src/data/add-on/dto/create-add-on.dto";
import { UpdateAddOnDto } from "src/data/add-on/dto/update-add-on.dto";
import { AddOnService } from "src/service/add-on.service";
import * as mongoose from 'mongoose';
import { AddOnType } from "src/data/add-on/schema/add-on.schema";

@Controller('api/add-on')
export class AddOnController {
    constructor(
        private readonly service: AddOnService
    ) {}

    @Post('create')
    async create(@Body() createAddOnDto: CreateAddOnDto) {
        try {
            if (createAddOnDto.type in AddOnType) {
                return await this.service.create(createAddOnDto)
            } else {
                throw new BadRequestException(`There is no type with name ${createAddOnDto.type}`)
            }
        } catch (error) {
            throw new BadRequestException(error )
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateAddOnDto: UpdateAddOnDto) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new BadRequestException()
            }
            if (updateAddOnDto.type != null) {
                if (updateAddOnDto.type in AddOnType) {
                    return await this.service.update(id, updateAddOnDto);
                } else {
                    throw new BadRequestException(`There is no type with name ${updateAddOnDto.type}`)
                }
            }
            return await this.service.update(id, updateAddOnDto);
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
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