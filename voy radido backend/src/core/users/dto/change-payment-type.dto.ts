import { ChangePaymentTypeToDailyConstraint } from './../validators/change-payment-type-to-daily.validator';
import { IsEnum, IsNotEmpty, Validate } from 'class-validator';
import { PaymentType } from '../enums/payment-type.enum';
import { ExistsDto } from './exists.dto';

export class PaymentTypeUsersDto extends ExistsDto {
  @Validate(ChangePaymentTypeToDailyConstraint)
  @IsNotEmpty({ message: 'El tipo de pago es requerido' })
  @IsEnum(PaymentType, { message: 'El tipo de pago es inválido' })
  paymentType: PaymentType;
}
