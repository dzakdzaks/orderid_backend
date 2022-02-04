import { BadRequestException, Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CreateAddOnDto } from "src/data/add-on/dto/create-add-on.dto";
import { UpdateAddOnDto } from "src/data/add-on/dto/update-add-on.dto";
import { AddOnService } from "src/service/add-on.service";
import * as mongoose from 'mongoose';
import { AddOnType } from "src/data/add-on/schema/add-on.schema";
import { AddOnItem } from "src/data/add-on/schema/add-on-item.schema";

@Controller('api/add-on')
export class AddOnController {
    constructor(
        private readonly service: AddOnService
    ) {}

    @Post('create')
    async create(@Body() createAddOnDto: CreateAddOnDto) {
        try {
            if (createAddOnDto.type in AddOnType) {
                const createdAddOn = await this.service.create(createAddOnDto)
                createAddOnDto.addOnItems.map((data) => {
                    data.addOn = createdAddOn._id
                    data.menu = createdAddOn.menu
                    return data
                })
                createdAddOn.addOnItems = await this.service.createAddOnItem(createAddOnDto.addOnItems)
                return createdAddOn
            } else {
                throw new BadRequestException(`There is no type with name ${createAddOnDto.type}`)
            }
        } catch (error) {
            throw new BadRequestException(error )
        }
    }

    @Patch('update/:id')
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

    @Post('delete/:id')
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