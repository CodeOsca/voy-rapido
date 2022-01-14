import { IsValidOperationDto } from './valid-operation.dto';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, Matches, Validate } from 'class-validator';
import { regexPhone } from 'src/shared/validators/regex.validator';
import { ExistsConstraint } from 'src/shared/validators/exists.validator';

export class CreateDto extends IsValidOperationDto {
  @IsNotEmpty({
    message: 'El nombre del usuario a entregar el envío es requerido',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({
    message: 'El nombre del usuario a entregar el envío es inválido',
  })
  deliveryName: string;

  @IsNotEmpty({
    message: 'La dirección del usuario a entregar el envío es requerido',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({
    message: 'La dirección del usuario a entregar el envío es inválido',
  })
  deliveryAddress: string;

  @IsNotEmpty({
    message: 'Los detalles de la dirección del usuario a entregar el envío es requerido',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({
    message: 'Los detalles de la dirección del usuario a entregar el envío es inválido',
  })
  addressDetails: string;

  @IsNotEmpty({
    message: 'El teléfono del usuario a entregar el envío es requerido',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({
    message: 'El teléfono del usuario a entregar el envío es inválido',
  })
  deliveryPhone: string;

  @IsNotEmpty({
    message: 'Las observaciones son requeridas',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({
    message: 'Las observaciones son inválidas',
  })
  observations: string;

  @Validate(ExistsConstraint, ['communes', 'La comuna no existe'])
  deliveryCommuna: Types.ObjectId;
}
