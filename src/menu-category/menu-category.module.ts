import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuCategoryController } from './menu-category.controller';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategory, MenuCategorySchema } from './schema/menu-category.schema';

@Module({
  controllers: [MenuCategoryController],
  providers: [MenuCategoryService],
  imports: [
    MongooseModule.forFeature([
      { name: MenuCategory.name, schema: MenuCategorySchema }
    ])
  ]
})
export class MenuCategoryModule {}
