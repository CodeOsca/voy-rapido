import { UserDto } from './../users.schema';
import { Connection, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { REQUEST_USER } from 'src/shared/interceptors/request-user.interceptor';
import { ExtendedValidationArguments } from 'src/shared/interface/validation-arguments.interface';
import { InjectConnection } from '@nestjs/mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class UpdatedDataConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(value: string, args: ExtendedValidationArguments) {
    const userID = args?.object[REQUEST_USER]._id;
    const user: UserDto = await this.connection.collection('users').findOne({ _id: Types.ObjectId(userID) });
    if (!user.address || !user.commune || !user.withdrawalAddress) {
      throw new BadRequestException('Debes actualizar tus datos');
    }
    return true;
  }
}
