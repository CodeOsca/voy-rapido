import { ExistsDto } from './exists.dto';
import { IsNotEmpty, Matches } from 'class-validator';

const regexExpirationTime = new RegExp(/[0-9]{1,2}[hmd]{1}/);

export class RenovateDto extends ExistsDto {
  @Matches(regexExpirationTime, {
    message: 'El tiempo de expiración es inválido',
  })
  @IsNotEmpty({ message: 'El tiempo de expiración es requerido' })
  expirationTime: string;
}
