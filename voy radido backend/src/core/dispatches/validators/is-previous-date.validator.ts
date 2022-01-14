import { DateString } from './../../../shared/services/date/date-string.service';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection, Types } from 'mongoose';

@ValidatorConstraint({ name: 'previousDate', async: true })
@Injectable()
export class IsPreviousDateConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(dispatchID: string) {
    const dispatch = await this.connection.collection('dispatches').findOne({ _id: Types.ObjectId(dispatchID) });
    const retirementDate = new DateString();
    const currentDate = new DateString();
    retirementDate.set(dispatch.retirementDate);
    return currentDate.lengthWith(retirementDate.date) >= 0;
  }

  defaultMessage() {
    return 'La fecha agendada debe ser mayor o igual a la actual.';
  }
}
