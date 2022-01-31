import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { MenuCategoryService } from './menu-category/menu-category.service';
import { MenuService } from './menu/menu.service';
import { RestaurantService } from './restaurant/restaurant.service';
import { Restaurant } from './restaurant/schema/restaurant.schema';
import * as mongoose from 'mongoose';

@Controller('api')
export class ApiController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuCategoryService: MenuCategoryService,
    private readonly menuService: MenuService
  ) { }

  @Get('get-restaurant')
  async getRestaurant(
    @Query('id') id: String,
    @Query('code') code: String
  ) {
    try {
      let restaurant: Restaurant
      if (code != null && code != '') {
        restaurant = await this.restaurantService.findOneByCode(code);
      } else if (id != null && id != '' && mongoose.isValidObjectId(id)) {
        restaurant = await this.restaurantService.findOneById(id);
      } else {
        throw new BadRequestException()
      }
      if (!restaurant) {
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
