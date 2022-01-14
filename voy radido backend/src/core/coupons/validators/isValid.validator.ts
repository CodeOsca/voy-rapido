import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CouponsService } from '../coupons.service';

@ValidatorConstraint({ name: 'isValid', async: true })
@Injectable()
export class IsValidCouponConstraint implements ValidatorConstraintInterface {
  constructor(private couponsService: CouponsService) {}

  async validate(code: string, args: ValidationArguments) {
    if (!code) {
      return true;
    }

    const coupon = await this.couponsService.findOne({ code });

    if (!coupon) {
      throw new NotFoundException('El cupón no existe');
    }

    if (!coupon.status) {
      throw new NotFoundException('El cupón esta deshabilitado');
    }

    try {
      this.couponsService.verify(coupon);
    } catch (error) {
      throw new BadRequestException('Cupón expirado');
    }

    return true;
  }
}
