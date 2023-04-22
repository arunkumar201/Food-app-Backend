import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateOrderInput, OrderItemInput } from './order.input';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field({ nullable: true })
  OrderId?: string;

  @Field({ nullable: true })
  total?: number;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  deliveryAddress?: string;

  @Field({ nullable: true })
  deliveryInstructions?: string;

  @Field({ nullable: true })
  deliveryTime?: string;

  @Field({ nullable: true })
  paymentMethod?: string;

  @Field({ nullable: true })
  paymentStatus?: string;

  @Field(() => [OrderItemInput], { nullable: true })
  items?: OrderItemInput[];

  @Field(() => Date, { nullable: true })
  deliveryDate?: Date;
}
