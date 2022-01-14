import { isRevisionSubscriptionConstraint } from './../validators/is-revision.validator';
import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class RejectedPaidDto {
  @Validate(isRevisionSubscriptionConstraint, { message: 'Operación inválida' })
  @Validate(ExistsConstraint, ['subscriptions', 'La subscripción no existe'])
  _id: Types.ObjectId;
}
