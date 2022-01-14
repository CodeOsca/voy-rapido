import { ArrayUnique, IsArray, IsNotEmpty, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class ExistsManyDto {
  @ArrayUnique({ message: 'Formato inválido (Productos duplicados)' })
  @IsArray({
    message: 'Formato inválido (Deber ser un conjunto de productos)',
  })
  @Validate(ExistsConstraint, ['users', 'Uno o más usuarios no existen'], {
    each: true,
  })
  @IsNotEmpty({ message: 'Los identificadores son requeridos' })
  _ids: Types.ObjectId[];
}
