import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { MinProductsConstraint } from 'src/core/products/validators/min-products.validator';
import { isRevisionDispatchConstraint } from '../validators/is-revision.validator';

export class ChangeToPaidDto {
  @Validate(MinProductsConstraint)
  @Validate(isRevisionDispatchConstraint, { message: 'Operación inválida' })
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  _id: Types.ObjectId;
}
