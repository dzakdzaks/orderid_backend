import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PreAuthMiddleware } from './utility/middleware/preauth.middleware';
import { FirebaseApp } from './utility/firebase/firebase-app';
import { ApiController } from './api.controller';
import { Restaurant, RestaurantSchema } from './restaurant/schema/restaurant.schema';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantService } from './restaurant/restaurant.service';
import { MenuCategory, MenuCategorySchema } from './menu-category/schema/menu-category.schema';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuCategoryService } from './menu-category/menu-category.service';
import { Menu, MenuSchema } from './menu/schema/menu.schema';
import { MenuModule } from './menu/menu.module';
import { MenuService } from './menu/menu.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dzakdzaks:dzakdzaks@firstcluster.wlsr7.mongodb.net/orderid_db?retryWrites=true&w=majority'),
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: MenuCategory.name, schema: MenuCategorySchema },
      { name: Menu.name, schema: MenuSchema },
    ]),
    RestaurantModule,
    MenuModule,
    MenuCategoryModule,
    UserModule
  ],
  controllers: [AppController, ApiController],
  providers: [AppService, FirebaseApp, RestaurantService, MenuCategoryService, MenuService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(PreAuthMiddleware)
      // .exclude(
      //   'restaurant/(.*)'
      // )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      })
  }
}
