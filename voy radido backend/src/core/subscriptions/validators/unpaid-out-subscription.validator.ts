import { SubscriptionsService } from './../subscriptions.service';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Status } from '../enums/status.enum';

@ValidatorConstraint({ name: 'unpaidOut', async: true })
@Injectable()
export class UnpaidOutSubscriptionConstraint implements ValidatorConstraintInterface {
  constructor(private subscriptionsService: SubscriptionsService) {}

  async validate(value: Types.ObjectId) {
    const { status } = await this.subscriptionsService.findOne({ _id: value });
    return status === Status.UNPAID;
  }
}
