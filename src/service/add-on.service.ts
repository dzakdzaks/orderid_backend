import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAddOnDto } from "src/data/add-on/dto/create-add-on.dto";
import { UpdateAddOnDto } from "src/data/add-on/dto/update-add-on.dto";
import { AddOnItem } from "src/data/add-on/schema/add-on-item.schema";
import { AddOn } from "src/data/add-on/schema/add-on.schema";

@Injectable()
export class AddOnService {
    constructor (
        @InjectModel(AddOn.name)
        private readonly model: Model<AddOn>,
        @InjectModel(AddOnItem.name)
        private readonly addOnItemModel: Model<AddOnItem>
    ) {}

    async findByMenu(menuId: string, isPopulated: number): Promise<AddOn[]> {
        if (isPopulated == 1) {
            return await this.model.find({ 'menu': menuId }).populate({ path: 'menu' }).exec()
        } 
        return await this.model.find({ 'menu': menuId }).exec()
    }

    async create(createAddOnDto: CreateAddOnDto): Promise<AddOn> {
        return await new this.model({
            'menu': createAddOnDto.menu,
            'name': createAddOnDto.name,
            'type': createAddOnDto.type
        }).save()
    }

    async update(id: string, updateAddOnDto: UpdateAddOnDto): Promise<AddOn> {
        return await this.model.findByIdAndUpdate(id, updateAddOnDto)
    }

    async delete(id: string): Promise<AddOn> {
        return await this.model.findByIdAndDelete(id)
    }

    // ADD ON ITEM
    async createAddOnItem(items: AddOnItem[]): Promise<AddOnItem[]> {
        return await this.addOnItemModel.insertMany(items)
    }

    async findAddOnItemsByMenuId(menuId: string, isPopulated: number): Promise<AddOnItem[]> {
        if (isPopulated == 1) {
            return await this.addOnItemModel.find({ 'menu': menuId }).populate({ path: 'menu' }).exec()
        } 
        return await this.addOnItemModel.find({ 'menu': menuId }).exec()
    }
}