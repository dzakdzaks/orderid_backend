import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuModule } from './menu/menu.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { PreAuthMiddleware } from './auth/preauth.middlewate';
import { FirebaseApp } from './auth/firebase-app';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://dzakdzaks:dzakdzaks@firstcluster.wlsr7.mongodb.net/orderid_db?retryWrites=true&w=majority'), RestaurantModule, MenuModule, MenuCategoryModule],
  controllers: [AppController],
  providers: [AppService, FirebaseApp],
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
