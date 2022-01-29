import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MenuCategoryService } from './menu-category/menu-category.service';
import { MenuCategory } from './menu-category/schemas/menu-category.schema';
import { MenuService } from './menu/menu.service';
import { RestaurantService } from './restaurant/restaurant.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuCategoryService: MenuCategoryService,
    private readonly menuService: MenuService
  ) {}

  @Get('get-restaurant/:id')
  async getRestaurant(
    @Param('id') id: String
  ) {
    const restaurant = await this.restaurantService.findOne(id)
    const menuCategories = await this.menuCategoryService.findByRestaurant(restaurant._id.toString(), 0)

    for(let n = 0; n < menuCategories.length; n++){
      menuCategories[n].menus = await this.menuService.findByMenuCategory(menuCategories[n]._id.toString(), 0)
    }
    return { restaurant, menuCategories }
  }
}
