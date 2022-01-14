import { Types } from 'mongoose';
import { IsOptional, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { UnpaidOutSubscriptionConstraint } from '../validators/unpaid-out-subscription.validator';
import { IsTimeToPayConstraint } from '../validators/is-time-to-pay.validator';
import { IsValidCouponConstraint } from 'src/core/coupons/validators/isValid.validator';

export class ChangeToRevisionDto {
  @Validate(IsTimeToPayConstraint)
  @Validate(UnpaidOutSubscriptionConstraint, {
    message: 'La subscripción ya ha sido pagada',
  })
  @Validate(ExistsConstraint, ['subscriptions', 'La subscripción no existe'])
  _id: Types.ObjectId;

  @Validate(IsValidCouponConstraint)
  @IsOptional()
  coupon: string;
}
