import { DispatchesDocument } from './../dispatches.schema';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PopulateInterceptor implements NestInterceptor {
  private populate = [
    {
      path: 'products',
      populate: {
        path: 'deliveryCommuna',
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
      map(async (dispatches: DispatchesDocument | DispatchesDocument[]) => {
        if (!dispatches) return dispatches;
        return Array.isArray(dispatches) ? this.toArray(dispatches) : this.toObject(dispatches);
      }),
    );
  }

  private async toArray(dispatches: DispatchesDocument[]) {
    for (const dispatch of dispatches) {
      await this.toObject(dispatch);
    }
    return dispatches;
  }

  private async toObject(dispatch: DispatchesDocument) {
    return dispatch.populate(this.populate).execPopulate();
  }
}
