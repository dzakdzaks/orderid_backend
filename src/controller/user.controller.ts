import { BadRequestException, Body, Controller, NotFoundException, Param, Post, Query, Req } from '@nestjs/common';
import e, { Request } from 'express';
import { UserService } from 'src/service/user.service';
import { FirebaseApp } from 'src/data/firebase/firebase-app';
import { CreateUserDto } from 'src/data/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly service: UserService,
        private readonly firebaseAuth: FirebaseApp
    ) { }

    @Post('employee-auth')
    async employeeAuth(
        @Body() createUserDto: CreateUserDto
    ) {
        try {
            const username = createUserDto.name
            const password = createUserDto.password
            const userResult = await this.service.findByName(username)
            if (userResult) {
                if (userResult.name === username && await bcrypt.compare(password, userResult.password)) {
                    return this.firebaseAuth.getAuth().createCustomToken(password)
                        .then(async (token) => {
                            const user = {
                                _id: userResult._id,
                                name: userResult.name,
                                uid: userResult.uid,
                                email: userResult.email,
                                createdAt: userResult.createdAt,
                                updatedAt: userResult.updatedAt
                            }
                            return { token, user }
                        })
                        .catch((error) => {
                            console.log('Error creating custom token:', error);
                        });
                } else {
                    throw new BadRequestException('Username or Password is wrong.')
                }
            } else {
                throw new NotFoundException('User not found.')
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Post('auth')
    async auth(
        @Req() request: Request,
        @Query('userId') userId: string
    ) {
        try {
            if (userId) {
                const user = await this.service.findById(userId);
                if (user == null) {
                    throw new NotFoundException('User not found.')
                } else {
                    return { message: 'User Logged In', user }
                }
            } else {
                const uid = request['user'].uid;
                if (uid == null) {
                    throw new BadRequestException('uid not found')
                }
                const user = await this.service.findByUid(uid);
                if (user == null) {
                    return this.firebaseAuth.getAuth()
                        .getUser(uid)
                        .then(async (userRecord) => {
                            const email = userRecord.email ? userRecord.email : userRecord.providerData[0].email;
                            const name = userRecord.displayName ? userRecord.displayName : email.split('@', 2)[0]
                            const createUserDto = {
                                email: email,
                                uid: uid,
                                name: name
                            }
                            await this.service.register(createUserDto)
                            const userResult = await this.service.findByUid(uid);
                            const user = {
                                _id: userResult._id,
                                name: userResult.name,
                                uid: userResult.uid,
                                email: userResult.email,
                                createdAt: userResult.createdAt,
                                updatedAt: userResult.updatedAt
                            }
                            return { message: 'User Registered', user }
                        })
                        .catch((error) => {
                            console.log('Error fetching user data:', error);
                            throw new BadRequestException(error)
                        })
                } else {
                    return { message: 'User Logged In', user }
                }
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Post('employee-add')
    async addEmployee(
        @Body() createUserDto: CreateUserDto
    ) {
        try {
            const saltOrRounds = 10;
            createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
            createUserDto.uid = randomBytes(10).toString('hex');
            createUserDto.email = `${randomBytes(10).toString('hex')}@mail.com`
            const employee = await this.service.register(createUserDto)
            const user = {
                _id: employee._id,
                name: employee.name,
                uid: employee.uid,
                email: employee.email,
                createdAt: employee.createdAt,
                updatedAt: employee.updatedAt
            }
            return { message: 'Employeee Added', user }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
