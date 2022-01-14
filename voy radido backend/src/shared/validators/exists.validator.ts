import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection, Types } from 'mongoose';

@ValidatorConstraint({ name: 'exists', async: true })
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(value: string, args: ValidationArguments) {
    this.isValid(value);
    const { constraints } = args;
    const [collection, message] = constraints;

    const exists = await this.connection.collection(collection).findOne({ _id: Types.ObjectId(value) });

    if (!exists) {
      throw new NotFoundException(message);
    }
    return true;
  }

  isValid(value: string) {
    const isValidObjectId = Types.ObjectId.isValid(value);
    if (!isValidObjectId) {
      throw new BadRequestException('ObjectId inválido');
    }
  }
}
