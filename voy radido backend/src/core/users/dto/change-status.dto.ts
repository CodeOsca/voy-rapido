import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ExistsManyDto } from './exists-many.dto';

export class StatusUsersDto extends ExistsManyDto {
  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean({ message: 'El estado es inválido' })
  status: boolean;
}
