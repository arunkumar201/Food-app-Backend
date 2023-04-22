import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field()
  OrderId: string;

  @Field()
  UserId: string;

  @Field(() => [OrderItemOutput])
  items: OrderItemOutput[];

  @Field()
  total: number;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  deliveryAddress: string;

  @Field()
  deliveryInstructions: string;

  @Field()
  deliveryTime: string;

  @Field()
  paymentMethod: string;

  @Field()
  paymentStatus: string;

  @Field()
  deliveryPersonName: string;

  @Field()
  deliveryPersonPhone: string;
}

@ObjectType()
class OrderItemOutput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  description: string;
}
