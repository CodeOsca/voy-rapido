import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Validate, IsNumber, Matches, Min, Max } from 'class-validator';
import { IsUniqueConstraint } from 'src/shared/validators/is-unique.validator';

const regexExpirationTime = new RegExp(/[0-9]{1,2}[hmd]{1}/);

export class CreateDto {
  @Validate(IsUniqueConstraint, ['coupuns'], {
    message: 'El cupón ya existe',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  name: string;

  @Min(0, { message: 'El porcentaje de descuento es inválido' })
  @Max(100, { message: 'El porcentaje de descuento es inválido' })
  @IsNotEmpty({ message: 'El porcentaje de descuento es requerida' })
  @IsNumber({}, { message: 'El porcentaje de descuente debe ser de tipo numérico' })
  discountRate: number;

  @Matches(regexExpirationTime, {
    message: 'El tiempo de expiración es inválido',
  })
  @IsNotEmpty({ message: 'El tiempo de expiración es requerido' })
  expirationTime: string;
}
