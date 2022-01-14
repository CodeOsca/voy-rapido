import { IsValidCouponConstraint } from './../../../core/coupons/validators/isValid.validator';
import { MinProductsConstraint } from '../../../core/products/validators/min-products.validator';
import { Validate, IsOptional, IsDefined } from 'class-validator';
import { Types } from 'mongoose';
import { UnpaidOutDispatchesConstraint } from '../../../core/dispatches/validators/unpaid-out-dispatches.validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { BelongsToMeConstraint } from 'src/shared/validators/belongs-to-me.validator';
import { IsPreviousDateConstraint } from 'src/core/dispatches/validators/is-previous-date.validator';

export class CreateFlowDto {
  @Validate(IsPreviousDateConstraint)
  @Validate(MinProductsConstraint)
  @Validate(BelongsToMeConstraint, ['dispatches'], {
    message: 'El despacho no te pertenece',
  })
  @Validate(UnpaidOutDispatchesConstraint, {
    message: 'El despacho ya han sido pagado',
  })
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe.'])
  dispatch: Types.ObjectId;

  @Validate(IsValidCouponConstraint)
  @IsOptional()
  coupon: string;

  @IsDefined()
  user: Types.ObjectId;
}
