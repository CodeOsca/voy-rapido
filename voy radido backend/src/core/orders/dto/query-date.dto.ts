import { IsNotEmpty } from 'class-validator';

export class QueryDateDto {
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  start: Date;

  @IsNotEmpty({ message: 'La fecha final es requerida' })
  end: Date;
}
