import { IsDayAvailableConstraint } from './../validators/is-day-available.validator';
import { UpdatedDataConstraint } from './../../users/validators/update-data.validator';
import { Validate, IsDefined } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDto {
  @Validate(IsDayAvailableConstraint)
  @Validate(UpdatedDataConstraint)
  @IsDefined()
  user: Types.ObjectId;
}
