import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly model: Model<UserDocument>
    ) {}

    async findByUid(uid: String): Promise<User> {
        return await this.model.findOne({ 'uid': uid }).exec()
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        return await new this.model({
            ...createUserDto
        }).save();
    }

    async update(id: String, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
    }
}
