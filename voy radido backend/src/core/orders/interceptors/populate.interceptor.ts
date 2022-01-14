import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrdersDocument } from '../orders.schema';

@Injectable()
export class PopulateInterceptor implements NestInterceptor {
  private populate = [
    {
      path: 'user',
      populate: {
        path: 'commune',
      },
    },
  ];

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (orders: OrdersDocument | OrdersDocument[]) => {
        return Array.isArray(orders) ? this.toArray(orders) : this.toObject(orders);
      }),
    );
  }

  private async toArray(orders: OrdersDocument[]) {
    for (const order of orders) {
      await this.toObject(order);
    }
    return orders;
  }

  private async toObject(orders: OrdersDocument) {
    return orders.populate(this.populate).execPopulate();
  }
}
