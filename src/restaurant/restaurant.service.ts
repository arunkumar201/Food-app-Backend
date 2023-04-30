import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantInput } from './inputs/create-restaurant.input';
import { UpdateRestaurantInput } from './inputs/update-restaurant.input';
import { InjectModel } from '@nestjs/mongoose';
import {
  RESTAURANT_MODEL,
  RestaurantDocument,
} from 'src/schemas/restaurant.schema';
import { Model } from 'mongoose';
import { Restaurant } from './types/restaurant.type';
import { nanoid } from 'nanoid';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(RESTAURANT_MODEL)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    try {
      const ownerId = nanoid(10);
      const restaurant = new this.restaurantModel({
        ...createRestaurantInput,
        ownerId: ownerId,
      });
      await restaurant.save();
      return restaurant.toObject();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async findAll(): Promise<any> {
    try {
      const restaurants = await this.restaurantModel.find().exec();
      if (!restaurants) {
        throw new NotFoundException('No restaurants found');
      }
      return restaurants;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async getRestaurantById(name: string): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantModel.findById(name).exec();
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      return restaurant.toObject();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateRestaurant(
    name: string,
    update: UpdateRestaurantInput,
  ): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantModel
        .findOne({ name: name })
        .exec();
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      restaurant.set(update);
      await restaurant.save();
      return restaurant.toObject();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteRestaurantByName(name: string) {
    try {
      const result = await this.restaurantModel
        .deleteOne({ name: name })
        .exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Restaurant not found');
      }
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
