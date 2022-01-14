import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async validate(value: string, args: ValidationArguments) {
    const { property, constraints, object } = args;
    const field = {};
    field[property] = value;

    if (!!object['_id']) {
      field['_id'] = { $ne: Types.ObjectId(object['_id']) };
    }

    const [collection] = constraints;
    const element = await this.connection.collection(collection).findOne(field);
    return !element;
  }
}
