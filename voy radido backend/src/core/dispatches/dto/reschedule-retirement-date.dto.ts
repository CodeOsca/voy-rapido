import { Types } from 'mongoose';
import { IsPreviousDateRescheduleConstraint } from '../validators/is-previous-date.-reschedule.validator';
import { IsNotEmpty, IsDateString, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class RescheduleRetirementDateDto {
  @Validate(ExistsConstraint, ['dispatches', 'El despacho no existe'])
  _id: Types.ObjectId;

  @Validate(IsPreviousDateRescheduleConstraint, {
    message: 'La fecha de retiro debe ser mayor o igual a la actual',
  })
  @IsDateString({}, { message: 'La fecha de retiro es inválida' })
  @IsNotEmpty({
    message: 'La fecha de retiro es requerida',
  })
  retirementDate: Date;
}
