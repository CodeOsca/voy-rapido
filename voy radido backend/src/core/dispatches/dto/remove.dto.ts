import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { CanRemoveConstraint } from '../validators/can-remove.dto';

export class RemoveDto {
  @Validate(CanRemoveConstraint)
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  _id: Types.ObjectId;
}
