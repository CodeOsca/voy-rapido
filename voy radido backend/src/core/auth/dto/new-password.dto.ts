import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class NewPasswordDto {
  @MinLength(8, { message: 'Contraseña (Mínimo de caracteres 8)' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La contraseña es inválida' })
  password: string;
}
