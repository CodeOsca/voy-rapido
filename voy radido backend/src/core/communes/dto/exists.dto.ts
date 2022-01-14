import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class ExistsDto {
  @Validate(ExistsConstraint, ['communes', 'La comuna no existe'])
  _id: Types.ObjectId;
}
