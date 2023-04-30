import { RESTAURANT_MODEL, RestaurantSchema } from './restaurant.schema';
import { Global, Module } from '@nestjs/common';
import { USER_MODEL, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PAYMENT_MODEL, PaymentSchema } from './payment.schema';
import { ORDER_MODEL, OrderSchema } from './order.schema';

const MODELS = [
  { name: USER_MODEL, schema: UserSchema },
  { name: PAYMENT_MODEL, schema: PaymentSchema },
  { name: ORDER_MODEL, schema: OrderSchema },
  { name: RESTAURANT_MODEL, schema: RestaurantSchema },
];
@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
