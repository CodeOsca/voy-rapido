import { Coupons } from './../coupons.schema';
import { CouponsService } from './../coupons.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class IsValidInterceptor implements NestInterceptor {
  constructor(private couponsService: CouponsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((coupons: Coupons[]) => {
        return coupons.map((coupon) => {
          try {
            this.couponsService.verify(coupon);
            coupon.isValid = true;
          } catch (error) {
            coupon.isValid = false;
          } finally {
            return coupon;
          }
        });
      }),
    );
  }
}
