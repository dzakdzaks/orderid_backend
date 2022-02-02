import { BadRequestException, Controller, NotFoundException, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/service/user.service';
import { FirebaseApp } from 'src/data/firebase/firebase-app';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly service: UserService,
        private readonly firebaseAuth: FirebaseApp
    ) { }

    @Post('auth')
    async auth(@Req() request: Request) {
        try {
            const uid = request['user'].uid;
            const user = await this.service.findByUid(uid);
            if (user == null) {
                return this.firebaseAuth.getAuth()
                    .getUser(uid)
                    .then(async (userRecord) => {
                        const createUserDto = {
                            email: userRecord.email,
                            uid: userRecord.uid,
                            name: userRecord.displayName ? userRecord.displayName : userRecord.email.split('@', 2)[0]
                        }
                        try {
                            await this.service.register(createUserDto)
                            const user = await this.service.findByUid(uid);
                            return { message: 'User Registered', user }
                        } catch (error) {
                            throw new BadRequestException(error)
                        }
                    })
                        .catch((error) => {
                            console.log('Error fetching user data:', error);
                            throw new BadRequestException(error)
                        })
            } else {
                return { message: 'User Logged In', user }
            }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
