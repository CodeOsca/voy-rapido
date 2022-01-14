import { SubscriptionsService } from './../subscriptions.service';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTimeToPay', async: true })
@Injectable()
export class IsTimeToPayConstraint implements ValidatorConstraintInterface {
  constructor(private subscriptionService: SubscriptionsService) {}

  async validate(value: Types.ObjectId, args: ValidationArguments) {
    const { canPay } = await this.subscriptionService.findOne({ _id: value });
    return canPay;
  }

  defaultMessage() {
    return 'El pago se debe realizar al final del mes.';
  }
}
