import { UnpaidOutDispatchesConstraint } from 'src/core/dispatches/validators/unpaid-out-dispatches.validator';
import { Types } from 'mongoose';
import { IsOptional, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { MinProductsConstraint } from 'src/core/products/validators/min-products.validator';
import { IsValidCouponConstraint } from 'src/core/coupons/validators/isValid.validator';

export class ChangeToRevisionDto {
  @Validate(MinProductsConstraint)
  @Validate(UnpaidOutDispatchesConstraint, { message: 'Operación inválida' })
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  _id: Types.ObjectId;

  @Validate(IsValidCouponConstraint)
  @IsOptional()
  coupon: string;
}
