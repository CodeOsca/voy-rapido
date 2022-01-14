import { Types } from 'mongoose';
import { Validate } from 'class-validator';
import { CreateDto } from './create.dto';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class UpdateDto extends CreateDto {
  @Validate(ExistsConstraint, ['products', 'El producto no existe'])
  _id: Types.ObjectId;
}
