import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './types/restaurant.type';
import { CreateRestaurantInput } from './inputs/create-restaurant.input';
import { UpdateRestaurantInput } from './inputs/update-restaurant.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantService.createRestaurant(
        createRestaurantInput,
      );
      return restaurant;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [Restaurant])
  getAllRestaurant() {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant)
  getRestaurantDetails(@Args('name', { type: () => String }) name: string) {
    return this.restaurantService.getRestaurantById(name);
  }

  @Mutation(() => Restaurant)
  updateRestaurant(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
    @Args('name') name: string,
  ) {
    return this.restaurantService.updateRestaurant(name, updateRestaurantInput);
  }

  @Mutation(() => Restaurant)
  DeleteRestaurantByName(@Args('name', { type: () => String }) name: string) {
    return this.restaurantService.deleteRestaurantByName(name);
  }
}
