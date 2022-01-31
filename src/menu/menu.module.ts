import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu, MenuSchema } from './schema/menu.schema';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [
    MongooseModule.forFeature([
      { name: Menu.name, schema: MenuSchema }
    ])
  ]
})
export class MenuModule {}
