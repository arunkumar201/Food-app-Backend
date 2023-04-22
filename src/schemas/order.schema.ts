import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Restaurant } from './restaurant.schema';
import { Payment } from './payment.schema';
import { ObjectType } from '@nestjs/graphql';
import { nanoid } from 'nanoid';

@ObjectType()
@Schema({
  collection: 'orders',
  timestamps: true,
})
export class Order {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: Number, required: true })
  total: number;
  @Prop({ type: String, unique: true })
  OrderId: string;

  @Prop({ type: String })
  UserId: string;
  @Prop({
    required: true,
    type: [
      { name: String, price: Number, quantity: Number, description: String },
    ],
  })
  items: {
    name: string;
    price: number;
    quantity: number;
    description: string;
  }[];

  @Prop({ type: String })
  deliveryAddress: string;

  @Prop({ type: String })
  deliveryInstructions: string;

  @Prop({ type: String })
  deliveryTime: string;

  @Prop({ type: String })
  paymentMethod: string;

  @Prop({ type: String })
  paymentStatus: string;

  @Prop({ type: String })
  deliveryPersonName: string;

  @Prop({ type: String })
  deliveryPersonPhone: string;

  @Prop({ type: String })
  review: string;

  @Prop({ type: String })
  rating: string;

  @Prop({ type: String })
  feedback: string;

  @Prop({ type: String })
  cancellationReason: string;

  @Prop({ type: Object })
  user: User;

  @Prop({ type: Object })
  restaurant: Restaurant;

  @Prop({ type: Object })
  payment: Payment;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = Order & Document;
OrderSchema.pre<OrderDocument>('save', function (next) {
  if (!this.isNew) {
    return next();
  }
  this.OrderId = nanoid(15);
  next();
});

export const ORDER_MODEL = Order.name;
