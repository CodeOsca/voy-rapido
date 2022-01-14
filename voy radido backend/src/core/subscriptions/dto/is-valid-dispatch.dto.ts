import { IsPreviousDateConstraint } from 'src/core/dispatches/validators/is-previous-date.validator';
import { BelongsToMeConstraint } from '../../../shared/validators/belongs-to-me.validator';
import { IsDefined, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { MinProductsConstraint } from 'src/core/products/validators/min-products.validator';
import { UnpaidOutDispatchesConstraint } from 'src/core/dispatches/validators/unpaid-out-dispatches.validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { HaveNoDebtConstraint } from 'src/core/subscriptions/validators/have-no-debt.validator';

export class IsValidDispatchDto {
  @Validate(IsPreviousDateConstraint)
  @Validate(MinProductsConstraint)
  @Validate(UnpaidOutDispatchesConstraint, {
    message: 'El despacho ya ha sido procesado',
  })
  @Validate(BelongsToMeConstraint, ['dispatches'], {
    message: 'El despacho no te pertenece',
  })
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  dispatch: Types.ObjectId;

  @Validate(HaveNoDebtConstraint)
  @IsDefined()
  user: Types.ObjectId;
}
