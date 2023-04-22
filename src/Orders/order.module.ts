import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  providers: [OrderService, OrderResolver],
  exports: [],
})
export class OrderModule {}
