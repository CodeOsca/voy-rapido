import { DispatchesCalculator } from './dispatches-calculator.model';
import { Types } from 'mongoose';
import { CouponCalculator } from './coupon-calculator.model';
import { Injectable } from '@nestjs/common';
import { Calculator } from 'src/shared/interface/calculator.interface';

@Injectable()
export class AmountCalculator implements Calculator<Types.ObjectId[]> {
  constructor(
    private couponCalculator: CouponCalculator,
    private dispatchesCalculator: DispatchesCalculator,
  ) {}

  async calculate(dispatches: Types.ObjectId[], coupon: string) {
    let total = await this.dispatchesCalculator.calculate(dispatches);
    total = await this.couponCalculator.calculate(coupon, total);
    return total;
  }
}
