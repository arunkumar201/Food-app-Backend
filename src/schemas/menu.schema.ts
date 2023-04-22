import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Restaurant } from './restaurant.schema';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({
  collection: 'menu',
  timestamps: true,
})
export class Menu {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [{ name: String, price: Number }] })
  items: { name: string; price: number }[];

  @Prop({ type: String })
  description: string;

  @Prop({ type: Object })
  restaurant: Restaurant;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
export type MenuDocument = Menu & Document;
export const MENU_MODEL = Menu.name;
