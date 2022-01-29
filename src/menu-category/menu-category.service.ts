import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMenuCategoryDto } from './dto/base-menu-category.dto';
import { MenuCategory, MenuCategoryDocument } from './schemas/menu-category.schema';

@Injectable()
export class MenuCategoryService {
    constructor(
        @InjectModel(MenuCategory.name)
        private readonly model: Model<MenuCategoryDocument>
    ) {}

    async findAll(): Promise<MenuCategory[]> {
        return this.model.find().exec()
    }

    async findPopulate(): Promise<MenuCategory[]> {
        return await this.model.find().populate({ path: 'restaurant', select: '' }).exec();
    }

    async findOne(id: String): Promise<MenuCategory> {
        return await this.model.findById(id).exec();
    }

    async findOnePopulate(id: String): Promise<MenuCategory> {
        return await this.model.findById(id).populate({ path: 'restaurant', select: '' }).exec();
    }

    async create(createMenuDto: BaseMenuCategoryDto): Promise<MenuCategory> {
        return await new this.model({
            ...createMenuDto
        }).save();
    }

    async update(id: String, updateMenuDto: BaseMenuCategoryDto): Promise<MenuCategory> {
        return await this.model.findByIdAndUpdate(id, updateMenuDto).exec();
    }

    async delete(id: String): Promise<MenuCategory> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
