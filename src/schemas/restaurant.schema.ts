import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Menu } from './menu.schema';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({
  collection: 'restaurant',
  timestamps: true,
})
export class Restaurant {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  coverImage: string;

  @Prop({ type: Boolean, default: false })
  isFeatured: boolean;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Boolean, default: false })
  isBanned: boolean;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: Number })
  reviewCount: number;

  @Prop({ type: String })
  owner: string;

  @Prop({ type: [String] })
  cuisines: string[];

  @Prop({ type: [String] })
  categories: string[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: [String] })
  features: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }] })
  menus: Menu[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
export type RestaurantDocument = Restaurant & Document;
export const RESTAURANT_MODEL = Restaurant.name;
