import { CouponsService } from './../../../../core/coupons/coupons.service';
import { Injectable } from '@nestjs/common';
import { Calculator } from 'src/shared/interface/calculator.interface';

@Injectable()
export class CouponCalculator implements Calculator<string> {
  constructor(private couponService: CouponsService) {}

  async calculate(code: string, currentAmount: number): Promise<number> {
    let amount = currentAmount;
    if (!!code) {
      const coupon = await this.couponService.findOne({ code });
      const discount = (coupon.discountRate * amount) / 100;
      amount = Math.round(amount - discount);
    }

    return amount;
  }
}
