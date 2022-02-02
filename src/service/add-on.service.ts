import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAddOnDto } from "src/data/add-on/dto/create-add-on.dto";
import { UpdateAddOnDto } from "src/data/add-on/dto/update-add-on.dto";
import { AddOn } from "src/data/add-on/schema/add-on.schema";

@Injectable()
export class AddOnService {
    constructor (
        @InjectModel(AddOn.name)
        private readonly model: Model<AddOn>
    ) {}

    async findByMenu(menuId: string, isPopulated: number): Promise<AddOn[]> {
        if (isPopulated == 1) {
            return await this.model.find({ 'menu': menuId }).populate({ path: 'menu' }).exec()
        } 
        return await this.model.find({ 'menu': menuId }).exec()
    }

    async create(createAddOnDto: CreateAddOnDto): Promise<AddOn> {
        return await new this.model({
            ...createAddOnDto
        }).save()
    }

    async update(id: string, updateAddOnDto: UpdateAddOnDto): Promise<AddOn> {
        return await this.model.findByIdAndUpdate(id, updateAddOnDto)
    }

    async delete(id: string): Promise<AddOn> {
        return await this.model.findByIdAndDelete(id)
    }
}