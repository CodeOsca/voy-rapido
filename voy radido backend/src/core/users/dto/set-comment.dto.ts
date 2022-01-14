import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class SetCommentDto {
  @Min(0, { message: 'El mínimo rating es 0' })
  @Max(5, { message: 'El máximo rating es 5' })
  @IsNotEmpty({ message: 'El rating es requerido' })
  @IsNumber({}, { message: 'El rating es inválido' })
  rating: number;

  @IsNotEmpty({ message: 'La descripción es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La descripción es inválida' })
  description: string;
}
