import { BadRequestException, Controller, Get, NotFoundException, Param } from '@nestjs/common';
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
  ) { }

  @Get('get-restaurant/:code')
  async getRestaurant(
    @Param('code') code: String
  ) {
    try {
      const restaurant = await this.restaurantService.findOne(code)
      if(!restaurant) {
        throw new NotFoundException()
      }
      const menuCategories = await this.menuCategoryService.findByRestaurant(restaurant._id.toString(), 0)
      const menus = await this.menuService.findByRestaurant(restaurant._id.toString(), 0)
      const pinnedMenus = menus.filter((item) => {
        return item.isPinnedMenu == true
      })
      menuCategories.map((item) => {
        return item.menus = menus.filter((menu) => {
          return menu.menuCategory == item._id
        })
      })
      return { restaurant, pinnedMenus, menuCategories }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
