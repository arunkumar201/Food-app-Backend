import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from './order.schema';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({
  collection: 'payment',
  timestamps: true,
})
export class Payment {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: Object })
  order: Order;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
export type PaymentDocument = Payment & Document;
export const PAYMENT_MODEL = Payment.name;
