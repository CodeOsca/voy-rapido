import { Types } from 'mongoose';
import { ProductDto } from '../../products/products.schema';
import { DispatchesService } from 'src/core/dispatches/dispatches.service';
import { DispatchesDocument } from '../dispatches.schema';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HooksRecorder {
  constructor(private dispatchesService: DispatchesService) {}

  private find(_id: Types.ObjectId) {
    return this.dispatchesService.findOne({ _id });
  }

  @OnEvent('Product.post.save')
  async save(product: ProductDto) {
    const dispatch = await this.find(product.dispatch_id);
    this.set(dispatch, product);
    await this.updateAmount(dispatch);
    await dispatch.save();
  }

  @OnEvent('Product.remove')
  async remove(product: ProductDto) {
    const dispatch = await this.find(product.dispatch_id);
    if (!!dispatch) {
      this.splice(dispatch, product);
      await this.updateAmount(dispatch);
      await dispatch.save();
    }
  }

  private set(dispatch: DispatchesDocument, product: ProductDto) {
    if (!dispatch.products.includes(product._id)) {
      dispatch.products.push(product._id);
    }
  }

  private splice(dispatch: DispatchesDocument, product: ProductDto) {
    const index = dispatch.products.findIndex((_id) => String(product._id) === String(_id));
    dispatch.products.splice(index, 1);
  }

  private async updateAmount(dispatch: DispatchesDocument) {
    await dispatch.populate('products').execPopulate();
    dispatch.amount = dispatch.products.reduce((acc, product) => acc + product['price'], 0);
  }
}
