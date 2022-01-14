import { EventEmitter2 } from '@nestjs/event-emitter';
import { PriceCalculator } from './models/price-calculator.model';
import { Product, ProductDto, ProductsDocument } from './products.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private products: Model<ProductsDocument>,
    private priceCalculator: PriceCalculator,
    private eventEmmiter: EventEmitter2,
  ) {}

  async create(product: Partial<Product>) {
    product['price'] = await this.priceCalculator.calculate(product);
    return this.products.create(product);
  }

  async createMany(products: Partial<Product[]>) {
    let result = [];
    for (const product of products) {
      result.push(await this.products.create(product));
    }
    return result;
  }

  findOne(field: Partial<ProductDto>) {
    return this.products.findOne(field);
  }

  findAll(field: Partial<ProductDto>) {
    return this.products.find(field);
  }

  async updateOne(_id: Types.ObjectId, updateDto: Partial<ProductDto>) {
    let product = await this.findOne({ _id });
    product['price'] = await this.priceCalculator.calculate(updateDto);
    Object.assign(product, updateDto);
    return product.save();
  }

  async updatePrice(_id: Types.ObjectId, price: number) {
    let product = await this.findOne({ _id });
    product.price = price;
    return product.save();
  }

  async removeOne(_id: Types.ObjectId) {
    const product = await this.findOne({ _id });
    await product.deleteOne();
    await this.eventEmmiter.emitAsync('Product.remove', product);
  }

  async removeMany(_ids: Types.ObjectId[]) {
    for (const _id of _ids) await this.removeOne(_id);
  }
}
