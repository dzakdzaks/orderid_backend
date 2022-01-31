import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuModule } from './menu/menu.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { PreAuthMiddleware } from './middleware/preauth.middleware';
import { FirebaseApp } from './firebase/firebase-app';
import { ApiController } from './api.controller';
import { RestaurantService } from './restaurant/restaurant.service';
import { Restaurant, RestaurantSchema } from './restaurant/schemas/restaurant.schema';
import { MenuCategory, MenuCategorySchema } from './menu-category/schemas/menu-category.schema';
import { Menu, MenuSchema } from './menu/schemas/menu.schema';
import { MenuCategoryService } from './menu-category/menu-category.service';
import { MenuService } from './menu/menu.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dzakdzaks:dzakdzaks@firstcluster.wlsr7.mongodb.net/orderid_db?retryWrites=true&w=majority'),
    RestaurantModule,
    MenuModule,
    MenuCategoryModule,
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: MenuCategory.name, schema: MenuCategorySchema },
      { name: Menu.name, schema: MenuSchema },
    ]),
    AuthModule],
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
