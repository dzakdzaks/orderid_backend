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

    async findAll(): Promise<Menu[]> {
        return this.model.find().exec()
    }

    async findPopulate(): Promise<Menu[]> {
        return await this.model.find().populate({ path: "restaurant", select: '' }).exec();
    }

    async findOne(id: String): Promise<Menu> {
        return await this.model.findById(id).exec();
    }

    async create(createMenuDto: CreateMenuDto): Promise<Menu> {
        return await new this.model({
            ...createMenuDto,
            createdAt: new Date(),
        }).save();
    }

    async update(id: String, updateMenuDto: UpdateMenuDto): Promise<Menu> {
        return await this.model.findByIdAndUpdate(id, updateMenuDto).exec();
    }

    async delete(id: String): Promise<Menu> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
