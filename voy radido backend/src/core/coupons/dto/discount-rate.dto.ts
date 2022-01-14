import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ExistsDto } from './exists.dto';

export class DiscountRateDto extends ExistsDto {
  @IsNotEmpty({ message: 'El tiempo de expiración es requerido' })
  @Min(0, { message: 'El porcentaje de descuento es inválido' })
  @Max(100, { message: 'El porcentaje de descuento es inválido' })
  @IsNumber({}, { message: 'El porcentaje de descuento es inválido' })
  discountRate: number;
}
