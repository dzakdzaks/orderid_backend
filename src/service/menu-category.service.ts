import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuCategory, MenuCategoryDocument } from 'src/data/menu-category/schema/menu-category.schema';
import { BaseMenuCategoryDto } from '../data/menu-category/dto/base-menu-category.dto';

@Injectable()
export class MenuCategoryService {
    constructor(
        @InjectModel(MenuCategory.name)
        private readonly model: Model<MenuCategoryDocument>
    ) {}

    async findAll(isPopulated: number): Promise<MenuCategory[]> {
        if (isPopulated == 1) {
            return await this.model.find().populate({ path: 'restaurant', select: '' }).exec();
        }
        return this.model.find().exec()
    }

    async findByRestaurant(id: String, isPopulated: number): Promise<MenuCategory[]> {
        if (isPopulated == 1) {
            return await this.model.find({ 'restaurant': id }).populate({ path: 'restaurant', select: '' }).exec()
        }
        return await this.model.find({ 'restaurant': id }).exec()
    }

    async findOne(id: String, isPopulated: number): Promise<MenuCategory> {
        if (isPopulated == 1) {
            return await this.model.findById(id).populate({ path: 'restaurant', select: '' }).exec();
        }
        return await this.model.findById(id).exec();
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
