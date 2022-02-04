import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuCategoryController } from '../controller/menu-category.controller';
import { MenuCategoryService } from '../service/menu-category.service';
import { Menu, MenuSchema } from '../data/menu/schema/menu.schema';
import { MenuCategory, MenuCategorySchema } from '../data/menu-category/schema/menu-category.schema';
import { MenuController } from '../controller/menu.controller';
import { MenuService } from '../service/menu.service';
import { RestaurantService } from '../service/restaurant.service';
import { RestaurantController } from '../controller/restaurant.controller';
import { Restaurant, RestaurantSchema } from '../data/restaurant/schema/restaurant.schema';
import { FirebaseApp } from 'src/data/firebase/firebase-app';
import { User, UserSchema } from '../data/user/schema/user.schema';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { AddOnController } from 'src/controller/add-on.controller';
import { AddOnService } from 'src/service/add-on.service';
import { AddOn, AddOnSchema } from 'src/data/add-on/schema/add-on.schema';
import { AddOnItem, AddOnItemSchema } from 'src/data/add-on/schema/add-on-item.schema';

@Module({
  controllers: [UserController, RestaurantController, MenuController, MenuCategoryController, AddOnController],
  providers: [FirebaseApp, UserService, RestaurantService, MenuService, MenuCategoryService, AddOnService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Menu.name, schema: MenuSchema },
      { name: MenuCategory.name, schema: MenuCategorySchema },
      { name: AddOn.name, schema: AddOnSchema },
      { name: AddOnItem.name, schema: AddOnItemSchema }
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
      {
        name: Restaurant.name,
        useFactory: () => {
          const schema = RestaurantSchema;
          schema.plugin(require('mongoose-unique-validator'));
          return schema;
        },
      }
    ])
  ]
})
export class ApiModule {}
