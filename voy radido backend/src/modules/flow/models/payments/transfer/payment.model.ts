import { CouponCalculator } from './../../calculator/coupon-calculator.model';
import { Types } from 'mongoose';
import { TypeReference } from '../../../../../core/orders/enums/type-reference.enum';
import { PaymentMedia } from '../../../../../core/orders/enums/media-payment.enum';
import { EventEmitter2 } from 'eventemitter2';
import { Status as StatusDispatch } from 'src/core/dispatches/enums/status.enum';
import { OrdersService } from '../../../../../core/orders/orders.service';
import { Injectable } from '@nestjs/common';
import { DispatchesService } from 'src/core/dispatches/dispatches.service';
import { UsersService } from 'src/core/users/users.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TransferPaymentService {
  constructor(
    private ordersService: OrdersService,
    private dispatchesService: DispatchesService,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private couponCalculator: CouponCalculator,
  ) {}

  @OnEvent('transfer.payment')
  async payment(dispatchID: Types.ObjectId) {
    const dispatch = await this.dispatchesService.findOne({ _id: dispatchID });
    const user = await this.usersService.findOne({ _id: dispatch.user });
    const amount = await this.couponCalculator.calculate(dispatch.coupon?.code, dispatch.amount);
    await this.ordersService.create({
      user: user._id,
      amount,
      payer: user.email,
      paymentDate: new Date(),
      media: PaymentMedia.TRANSFER,
      reference: dispatch._id,
      typeReference: TypeReference.DISPATCH,
    });
    await this.dispatchesService.updateOne(dispatch._id, { status: StatusDispatch.PAID });
    this.eventEmitter.emit('dispatch.transfer.payment', dispatch);
  }
}
