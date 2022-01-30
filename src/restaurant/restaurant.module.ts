import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './schemas/restaurant.schema';

@Module({
  providers: [RestaurantService],
  controllers: [RestaurantController],
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema }  
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Restaurant.name,
        useFactory: () => {
          const schema = RestaurantSchema;
          schema.plugin(require('mongoose-unique-validator'));
          return schema;
        },
      },
    ]),
  ]
})
export class RestaurantModule {}
