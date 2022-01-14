import { IsValidOperationDto } from './valid-operation.dto';
import { ArrayUnique, IsArray, IsNotEmpty, Validate } from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class RemoveDto extends IsValidOperationDto {
  @ArrayUnique({ message: 'Formato inválido (Productos duplicados)' })
  @IsArray({
    message: 'Formato inválido (Deber ser un conjunto de productos)',
  })
  @Validate(ExistsConstraint, ['products', 'Uno o más productos no existen'], {
    each: true,
  })
  @IsNotEmpty({ message: 'Los identificadores son requeridos' })
  _ids: Types.ObjectId[];
}
