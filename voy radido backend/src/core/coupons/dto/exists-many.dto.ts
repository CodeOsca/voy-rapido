import { Types } from 'mongoose';
import { ArrayUnique, IsArray, IsNotEmpty, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class ExistsManyDto {
  @ArrayUnique({ message: 'Formato inválido (Cupones duplicados)' })
  @IsArray({
    message: 'Formato inválido (Deber ser un conjunto de cupones)',
  })
  @Validate(ExistsConstraint, ['coupons', 'Uno o más cupones no existen'], {
    each: true,
  })
  @IsNotEmpty({ message: 'Los identificadores son requeridos' })
  _ids: Types.ObjectId[];
}
