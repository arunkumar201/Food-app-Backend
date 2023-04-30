import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  cityId: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ defaultValue: 0 })
  rating: number;

  @Prop({ defaultValue: 12, required: true })
  shippingFeePerKm: number;

  @Prop({ defaultValue: 0 })
  reviewCount: number;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  lat: string;

  @Prop({ required: true })
  lng: string;

  @Prop({ type: [String] })
  categories: string[];

  @Prop({
    type: [{ name: String, description: String, price: Number, image: String }],
  })
  menus: { name: string; description: string; price: number; image: string }[];
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
export type RestaurantDocument = Restaurant & Document;
export const RESTAURANT_MODEL = Restaurant.name;
