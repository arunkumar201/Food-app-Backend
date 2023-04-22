import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field()
  UserId: string;

  @Field(() => [OrderItemInput])
  items: OrderItemInput[];

  @Field()
  total: number;

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
  OrderId: string;
}

@InputType()
export class OrderItemInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  description: string;
}
