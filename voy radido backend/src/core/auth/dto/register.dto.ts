import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, Validate } from 'class-validator';
import { regexEmail, regexPhone } from 'src/shared/validators/regex.validator';

import { IsUniqueConstraint } from 'src/shared/validators/is-unique.validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  name: string;

  @IsNotEmpty({ message: 'El nombre del pyme es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre del pyme es inválido' })
  storeName: string;

  @Validate(IsUniqueConstraint, ['users'], { message: 'El email ya existe' })
  @Matches(regexEmail, { message: 'Email (formato inválido)' })
  @IsNotEmpty({ message: 'El email es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEmail({}, { message: 'El email es inválido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @Matches(regexPhone, { message: 'Teléfono (formato inválido)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El teléfono es inválido' })
  phone: string;

  @MinLength(8, { message: 'Contraseña (Mínimo de caracteres 8)' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La contraseña es inválida' })
  password: string;
}
