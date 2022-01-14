import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  IsOptional,
  Validate,
} from 'class-validator';
import { Types } from 'mongoose';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';
import { regexPhone } from 'src/shared/validators/regex.validator';
import { RegisterDto } from '../../auth/dto/register.dto';

export class UpdateDto extends PartialType(RegisterDto) {
  @Validate(ExistsConstraint, ['users', 'El usuario no existe'])
  _id: Types.ObjectId;

  @IsNotEmpty({ message: 'La dirección de retiro es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La dirección de retiro es inválida' })
  @IsOptional()
  withdrawalAddress: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'La dirección es inválida' })
  @IsOptional()
  address: string;

  @Matches(regexPhone, { message: 'Teléfono 2 (formato inválido)' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El teléfono 2 es inválido' })
  @IsOptional()
  phoneTwo: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El instagram es inválido' })
  @IsOptional()
  instagram: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'El nombre del sitio web es inválido' })
  @IsOptional()
  website: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Los detalles de la tienda son inválidos' })
  @IsOptional()
  storeDetails: string;

  @Validate(ExistsConstraint, ['communes', 'La comuna no existe'])
  @IsOptional()
  commune: Types.ObjectId;
}
