import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseApp } from 'src/utility/firebase/firebase-app';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    providers: [UserService, FirebaseApp],
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        MongooseModule.forFeatureAsync([
            {
              name: User.name,
              useFactory: () => {
                const schema = UserSchema;
                schema.plugin(require('mongoose-unique-validator'));
                return schema;
              },
            },
          ]),
    ]
})
export class UserModule {}
