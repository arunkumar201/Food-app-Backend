import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Order } from './types/order.type';
import { OrderService } from './order.service';
import { CreateOrderInput } from './inputs/order.input';
import { BadRequestException } from '@nestjs/common';
import { UpdateOrderInput } from './inputs/updateorder.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}
  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderData') createOrderData: CreateOrderInput,
  ): Promise<Order | any> {
    if (!createOrderData.UserId) {
      throw new BadRequestException('userId is required');
    }
    if (!createOrderData.items || createOrderData.items.length === 0) {
      throw new BadRequestException(
        'items is required and must contain at least one item',
      );
    }
    return this.orderService.createOrder(createOrderData);
  }
  @Query(() => Order)
  async getOrderById(@Args('OrderId') OrderId: string): Promise<Order> {
    const order = await this.orderService.getOrderById(OrderId);
    if (!order) {
      throw new Error(`Order with OrderId ${OrderId} does not exist`);
    }
    if (!order.OrderId) {
      throw new Error(`OrderId is null for Order with OrderId ${OrderId}`);
    }
    return order;
  }
  @Query(() => [Order])
  async getAllOrder(): Promise<any> {
    return this.orderService.getAllOrder();
  }

  @Mutation(() => String)
  async DeleteOrderById(
    @Args('OrderId') OrderId: string,
  ): Promise<boolean | string> {
    await this.orderService.DeleteOrderById(OrderId);
    try {
      return 'Order Deleted';
    } catch (error) {
      throw new Error(
        `Failed to delete order with OrderId ${OrderId}: ${error.message}`,
      );
    }
  }
  @Mutation(() => Order)
  async updateOrderById(
    @Args('OrderId') OrderId: string,
    @Args('updateOrderData') updateOrderData: UpdateOrderInput,
  ) {
    return this.orderService.updateOrderById(OrderId, updateOrderData);
  }
}
