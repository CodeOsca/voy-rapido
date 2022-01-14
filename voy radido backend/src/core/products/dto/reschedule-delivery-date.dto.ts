import { Types } from 'mongoose';
import { IsNotEmpty, IsDateString, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { IsPreviousDateRescheduleConstraint } from 'src/core/dispatches/validators/is-previous-date.-reschedule.validator';

export class RescheduleDeliveryDateDto {
  @Validate(ExistsConstraint, ['products', 'El producto no existe'])
  _id: Types.ObjectId;

  @Validate(IsPreviousDateRescheduleConstraint, {
    message: 'La fecha de envío debe ser mayor o igual a la actual',
  })
  @IsDateString({}, { message: 'La fecha de envío es inválida' })
  @IsNotEmpty({
    message: 'La fecha de envió es requerida',
  })
  deliveryDate: Date;
}
