import { Injectable, NotFoundException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@ValidatorConstraint({ name: 'existsEmail', async: true })
@Injectable()
export class ExistsEmailConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(email: string) {
    const exists = await this.connection.collection('users').findOne({ email });

    if (!exists) {
      throw new NotFoundException('El email no existe');
    }
    return true;
  }
}
