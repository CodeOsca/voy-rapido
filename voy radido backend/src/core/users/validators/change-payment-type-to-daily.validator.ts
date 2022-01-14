import { UserDto } from './../users.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import { PaymentType } from '../enums/payment-type.enum';
import { Status } from 'src/core/subscriptions/enums/status.enum';

@ValidatorConstraint({ name: 'changePaymentTypeToDaily', async: true })
@Injectable()
export class ChangePaymentTypeToDailyConstraint implements ValidatorConstraintInterface {
  private user: UserDto;
  constructor(@InjectConnection() readonly connection: Connection) {}

  async validate(paymentType: PaymentType, args: ValidationArguments) {
    if (paymentType === PaymentType.MONTHLY) {
      return true;
    }

    const userID = args.object['_id'];
    this.user = await this.connection.collection('users').findOne({ _id: Types.ObjectId(userID) });
    const subscription = await this.connection
      .collection('subscriptions')
      .findOne({ user: Types.ObjectId(userID), $or: [{ status: Status.UNPAID }, { status: Status.REVISION }] });

    if (!subscription) {
      return true;
    }

    if (subscription.status === Status.REVISION) {
      throw new BadRequestException(`La pyme ${this.user.storeName} tiene un pago mensual en revisión.`);
    }

    if (subscription.dispatches.length > 0) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return `La pyme ${this.user.storeName} tiene pagos pendientes.`;
  }
}
