import { Types } from 'mongoose';
import { IsNumber, Min, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class ChangePriceDto {
  @Validate(ExistsConstraint, ['products', 'El producto no existe'])
  _id: Types.ObjectId;

  @Min(0, { message: 'No se permiten valores negativos' })
  @IsNumber({}, { message: 'El precio del producto es inválido' })
  price: number;
}
