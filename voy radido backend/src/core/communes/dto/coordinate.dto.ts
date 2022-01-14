import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CoordinateDto {
  @IsLatitude({ message: 'La latitud es inválida' })
  @IsNotEmpty({ message: 'La latitud es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  latitude: string;

  @IsLongitude({ message: 'La logitud es inválida' })
  @IsNotEmpty({ message: 'La longitud es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  longitude: string;
}
