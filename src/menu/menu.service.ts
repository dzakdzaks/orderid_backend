import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenuService {
    constructor(
        @InjectModel(Menu.name)
        private readonly model: Model<MenuDocument>
    ) {}

    async findAll(isPopulated: number): Promise<Menu[]> {
        if (isPopulated == 1) {
            return await this.model.find().populate(
                { path: 'menuCategory', 
                populate: {
                    path: 'restaurant'
                },
                select: '' }
            ).exec();
        }
        return await this.model.find().exec()
    }

    async findByMenuCategory(id: String, isPopulated: number): Promise<Menu[]> {
        if (isPopulated == 1) {
            return await this.model.find({ 'menuCategory': id })
            .populate(
                { path: 'menuCategory',
                populate: {
                    path: 'restaurant'
                },
                 select: '' }
            ).exec()
        }
        return await this.model.find({ 'menuCategory': id }).exec()
    }

    async findOne(id: String, isPopulated: number): Promise<Menu> {
        if (isPopulated == 1) {
            return await this.model.findById(id).populate(
                { path: 'menuCategory', 
                populate: {
                    path: 'restaurant'
                },
                select: '' }
            ).exec();
        }
        return await this.model.findById(id).exec();
    }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        return await new this.model({
            ...createMenuDto
        }).save();
    }

    async update(id: String, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        return await this.model.findByIdAndUpdate(id, updateMenuDto).exec();
    }

    async delete(id: String): Promise<Menu> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
