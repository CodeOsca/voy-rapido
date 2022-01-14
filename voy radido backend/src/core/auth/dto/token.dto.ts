import { IsValidTokenConstraint } from './../validators/token-new-password.validator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, Validate } from 'class-validator';

export class TokenDto {
  @Validate(IsValidTokenConstraint)
  @IsNotEmpty({ message: 'El token es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  token: string;
}
