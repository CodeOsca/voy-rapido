import { Days } from '../enums/days.enum';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  ArrayUnique,
  Validate,
  IsNumber,
  IsEnum,
  IsArray,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';

import { IsUniqueConstraint } from 'src/shared/validators/is-unique.validator';
import { CoordinateDto } from './coordinate.dto';

export class CreateDto {
  @Validate(IsUniqueConstraint, ['communes'], {
    message: 'La comuna ya existe',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre es inválido' })
  name: string;

  @IsNotEmptyObject({}, { message: 'Las coordenadas son requeridas' })
  @IsObject({ message: 'Las coordenadas son inválidas' })
  @ValidateNested()
  @Type(() => CoordinateDto)
  coordinates: CoordinateDto;

  @IsNotEmpty({ message: 'El precio es requerida' })
  @IsNumber({}, { message: 'El precio debe ser de tipo numérico' })
  price: number;

  @ArrayNotEmpty({
    message: 'Formato inválido (Debe seleccionar al menos un día)',
  })
  @ArrayUnique({ message: 'Formato inválido (Días duplicados)' })
  @IsArray({
    message: 'Formato inválido (Deber ser un conjunto de diás)',
  })
  @IsEnum(Days, {
    message: 'Días de envio inválidos',
    each: true,
  })
  retirementDates: Days[];
}
