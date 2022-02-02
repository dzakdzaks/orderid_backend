import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from 'src/module/api.module';
import { FirebaseApp } from 'src/data/firebase/firebase-app';
import { PreAuthMiddleware } from 'src/utility/middleware/preauth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dzakdzaks:dzakdzaks@firstcluster.wlsr7.mongodb.net/orderid_db?retryWrites=true&w=majority'),
    ApiModule
  ],
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
