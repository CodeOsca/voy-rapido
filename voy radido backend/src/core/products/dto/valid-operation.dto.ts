import { BelongsToMeConstraint } from './../../../shared/validators/belongs-to-me.validator';
import { Types } from 'mongoose';
import { IsValidOperationConstraint } from '../validators/valid-operation.validator';
import { IsDefined, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class IsValidOperationDto {
  @Validate(IsValidOperationConstraint, { message: 'Operación inválida' })
  @Validate(BelongsToMeConstraint, ['dispatches'], {
    message: 'El despacho no te pertenece',
  })
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  dispatch_id: Types.ObjectId;

  @IsDefined()
  user: Types.ObjectId;
}
