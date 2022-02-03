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
                        const user = await this.service.findByUid(uid);
                        return { message: 'User Registered', user }
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
