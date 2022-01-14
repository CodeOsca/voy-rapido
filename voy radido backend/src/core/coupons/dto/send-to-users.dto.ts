import { ExistsDto } from './exists.dto';
import { ArrayUnique, IsArray, IsNotEmpty, Validate } from 'class-validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class SendUsersDto extends ExistsDto {
  @ArrayUnique({ message: 'Formato inválido (Usuarios duplicados)' })
  @IsArray({
    message: 'Formato inválido (Deber ser un conjunto de usuarios)',
  })
  @Validate(ExistsConstraint, ['users', 'Uno o más usuarios no existen'], {
    each: true,
  })
  @IsNotEmpty({ message: 'Los identificadores son requeridos' })
  users: string[];
}
