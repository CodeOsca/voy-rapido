import { ExistsDto } from '../../users/dto/exists.dto';
import { IsBoolean } from 'class-validator';

export class VerifyAccountDto extends ExistsDto {
  @IsBoolean({ message: 'Formato inválido' })
  verified: boolean;
}
