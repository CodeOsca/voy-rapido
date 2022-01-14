import { ProductsService } from '../products.service';
import { OnEvent } from '@nestjs/event-emitter';
import { DispatchDto } from '../../dispatches/dispatches.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HooksRecorder {
  constructor(private productsService: ProductsService) {}

  @OnEvent('Dispatch.pre.remove', { async: true })
  async remove(dispatch: DispatchDto) {
    await this.productsService.removeMany(dispatch.products);
  }
}
