import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ORDER_MODEL, Order, OrderDocument } from 'src/schemas/order.schema';
import { CreateOrderInput } from './inputs/order.input';
import { UpdateOrderInput } from './inputs/updateorder.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(ORDER_MODEL) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrderData: CreateOrderInput): Promise<Order> {
    const newOrder = new this.orderModel({
      OrderId: createOrderData.OrderId,
      UserId: createOrderData.UserId,
      items: createOrderData.items,
      total: createOrderData.items.reduce((acc, item) => acc + item.price, 0),
      status: 'CREATED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deliveryAddress: createOrderData.deliveryAddress,
      deliveryInstructions: createOrderData.deliveryInstructions,
      deliveryTime: createOrderData.deliveryTime,
      paymentMethod: createOrderData.paymentMethod,
      paymentStatus: createOrderData.paymentStatus,
      deliveryPersonName: createOrderData.deliveryPersonName,
      deliveryPersonPhone: createOrderData.deliveryPersonPhone,
    });
    const savedOrder = await newOrder.save();
    return savedOrder;
  }
  async getOrderById(OrderId: string) {
    return await this.orderModel.findOne({ OrderId: OrderId }).exec();
  }
  async getAllOrder() {
    return await this.orderModel.find().exec();
  }
  async DeleteOrderById(OrderId: string) {
    try {
      const result = await this.orderModel
        .deleteOne({ OrderId: OrderId })
        .exec();
      if (result.deletedCount === 0) {
        throw new Error('No document was deleted');
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }

  async updateOrderById(
    OrderId: string,
    updateOrderData: UpdateOrderInput,
  ): Promise<Order> {
    const order = await this.orderModel.findOne({ OrderId });
    if (!order) {
      throw new NotFoundException(`Order with OrderId ${OrderId} not found`);
    }

    try {
      Object.assign(order, updateOrderData);
      const updatedOrder = await order.save();
      return updatedOrder;
    } catch (error) {
      throw new BadRequestException(`Error updating order: ${error.message}`);
    }
  }
}
