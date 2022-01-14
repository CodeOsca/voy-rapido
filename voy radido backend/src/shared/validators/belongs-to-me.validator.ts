import { Connection, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { REQUEST_USER } from 'src/shared/interceptors/request-user.interceptor';
import { ExtendedValidationArguments } from 'src/shared/interface/validation-arguments.interface';
import { InjectConnection } from '@nestjs/mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class BelongsToMeConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(value: string, args: ExtendedValidationArguments) {
    const { constraints } = args;
    const [collection] = constraints;
    const userID = args?.object[REQUEST_USER]._id;
    const element = await this.connection
      .collection(collection)
      .findOne({ _id: Types.ObjectId(value), user: Types.ObjectId(userID) });

    return !!element;
  }
}
