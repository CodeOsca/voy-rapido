import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { ProductDto } from '../products.schema';

@Injectable()
export class EventEmitterHooksRecorder {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('Product.pre.save')
  async changeAmount(product: ProductDto) {
    if (!product['isNew'] && product['isModified']('price')) {
      this.eventEmitter.emit('product.change-amount', product);
    }
  }
}
