import { ExistsEmailConstraint } from 'src/core/users/validators/exists-email.validator';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, Validate } from 'class-validator';

export class ForgotPasswordDto {
  @Validate(ExistsEmailConstraint)
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;
}
