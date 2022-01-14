import { isRevisionDispatchConstraint } from './../validators/is-revision.validator';
import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class RejectedPaidDto {
  @Validate(isRevisionDispatchConstraint, { message: 'Operación inválida' })
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  _id: Types.ObjectId;
}
