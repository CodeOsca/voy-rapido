import { Types } from 'mongoose';
import { ArrayUnique, IsArray, IsNotEmpty, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class ExistsManyDto {
  @Validate(ExistsConstraint, ['communes', 'Una o más comunas no existen'], {
    each: true,
  })
  @ArrayUnique({ message: 'Formato inválido (Comunas duplicadas)' })
  @IsArray({
    message: 'Formato inválido (Deber ser un conjunto de comunas)',
  })
  @IsNotEmpty({ message: 'Los identificadores son requeridos' })
  _ids: Types.ObjectId[];
}
