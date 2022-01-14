import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Status } from 'src/core/dispatches/enums/status.enum';
import { SubscriptionsService } from '../subscriptions.service';

@ValidatorConstraint({ name: 'isRevisionSubscription', async: true })
@Injectable()
export class isRevisionSubscriptionConstraint implements ValidatorConstraintInterface {
  constructor(private subscriptionsService: SubscriptionsService) {}

  async validate(value: Types.ObjectId, args: ValidationArguments) {
    const { status } = await this.subscriptionsService.findOne({ _id: value });
    return status === Status.REVISION;
  }
}
