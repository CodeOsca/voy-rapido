import { ExistsDto } from './exists.dto';
import { IsBoolean } from 'class-validator';

export class ToggleCommentDto extends ExistsDto {
  @IsBoolean({ message: 'El formato es inválido' })
  visible: boolean;
}
