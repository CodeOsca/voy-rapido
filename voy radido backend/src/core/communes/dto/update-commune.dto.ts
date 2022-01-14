import { Types } from 'mongoose';
import { PartialType } from '@nestjs/swagger';
import { CreateDto } from './create.dto';
import { Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class UpdateDto extends PartialType(CreateDto) {
  @Validate(ExistsConstraint, ['communes', 'La comuna no existe'])
  _id: Types.ObjectId;
}
