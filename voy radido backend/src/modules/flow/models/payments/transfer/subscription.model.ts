import { EventEmitter2 } from 'eventemitter2';
import { Status as StatusDispatch } from 'src/core/dispatches/enums/status.enum';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { DispatchesService } from 'src/core/dispatches/dispatches.service';
import { UsersService } from 'src/core/users/users.service';
import { SubscriptionsService } from 'src/core/subscriptions/subscriptions.service';
import { Status as SubscriptionStatus } from '../../../../../core/subscriptions/enums/status.enum';
import { OrdersService } from 'src/core/orders/orders.service';
import { PaymentMedia } from 'src/core/orders/enums/media-payment.enum';
import { TypeReference } from 'src/core/orders/enums/type-reference.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { CouponCalculator } from '../../calculator/coupon-calculator.model';

@Injectable()
export class TransferSubscriptionService {
  constructor(
    private ordersService: OrdersService,
    private dispatchesService: DispatchesService,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private subscriptionsService: SubscriptionsService,
    private couponCalculator: CouponCalculator,
  ) {}

  @OnEvent('transfer.subscription')
  async subscription(subscriptionID: Types.ObjectId) {
    const subscription = await this.subscriptionsService.findOne({ _id: subscriptionID });
    const user = await this.usersService.findOne({ _id: subscription.user });
    const amount = await this.couponCalculator.calculate(subscription.coupon?.code, subscription.amount);
    await this.ordersService.create({
      user: user._id,
      amount,
      payer: user.email,
      paymentDate: new Date(),
      media: PaymentMedia.TRANSFER,
      reference: subscription._id,
      typeReference: TypeReference.SUBSCRIPTION,
    });
    await this.subscriptionsService.updateOne(subscription._id, { status: SubscriptionStatus.PAID });
    for (const dispatch of subscription.dispatches) {
      await this.dispatchesService.updateOne(dispatch, { status: StatusDispatch.PAID });
    }
    this.eventEmitter.emit('subscription.transfer.payment', subscription);
  }
}
