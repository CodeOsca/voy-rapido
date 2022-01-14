import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubscriptionsDocument } from '../subscriptions.schema';

@Injectable()
export class PopulateInterceptor implements NestInterceptor {
  private populate = [
    {
      path: 'dispatches',
      populate: {
        path: 'products',
        populate: {
          path: 'deliveryCommuna',
        },
      },
    },
    {
      path: 'user',
      populate: {
        path: 'commune',
      },
    },
  ];

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        async (
          subscriptions: SubscriptionsDocument | SubscriptionsDocument[],
        ) => {
          if (!subscriptions) return subscriptions;
          return Array.isArray(subscriptions)
            ? this.toArray(subscriptions)
            : this.toObject(subscriptions);
        },
      ),
    );
  }

  private async toArray(subscriptions: SubscriptionsDocument[]) {
    for (const subscription of subscriptions) {
      await this.toObject(subscription);
    }
    return subscriptions;
  }

  private async toObject(subscription: SubscriptionsDocument) {
    return subscription.populate(this.populate).execPopulate();
  }
}
