import { UnpaidOutSubscriptionConstraint } from '../validators/unpaid-out-subscription.validator';
import { IsTimeToPayConstraint } from '../validators/is-time-to-pay.validator';
import { BelongsToMeConstraint } from '../../../shared/validators/belongs-to-me.validator';
import { IsDefined, IsOptional, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { IsValidCouponConstraint } from 'src/core/coupons/validators/isValid.validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class CanPayDto {
  @Validate(UnpaidOutSubscriptionConstraint, {
    message: 'La subscripción ya ha sido pagada',
  })
  @Validate(BelongsToMeConstraint, ['subscriptions'], {
    message: 'La subscripción no te pertenece',
  })
  @Validate(IsTimeToPayConstraint)
  @Validate(ExistsConstraint, ['subscriptions', 'La subscripción no existe'])
  _id: Types.ObjectId;

  @Validate(IsValidCouponConstraint)
  @IsOptional()
  coupon: string;

  @IsDefined()
  user: Types.ObjectId;
}
