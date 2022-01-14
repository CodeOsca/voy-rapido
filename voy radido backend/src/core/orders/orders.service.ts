import { Orders, OrdersDocument, OrderDto } from './orders.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders.name) private orders: Model<OrdersDocument>) {}

  findAll(field: Partial<OrderDto> = {}) {
    return this.orders.find(field);
  }

  create(order: Partial<Orders>) {
    return this.orders.create(order);
  }

  findOne(field: Partial<OrderDto>) {
    return this.orders.findOne(field);
  }

  updateOne(_id: Types.ObjectId, order: Partial<Orders>) {
    return this.orders.updateOne({ _id }, order);
  }

  remove(_id: Types.ObjectId) {
    return this.orders.deleteOne({ _id });
  }

  async length() {
    const orders = await this.findAll();
    return orders.length;
  }

  async amountPaid() {
    const orders = await this.findAll();
    return orders.reduce((acc, val) => acc + val.amount, 0);
  }
}
