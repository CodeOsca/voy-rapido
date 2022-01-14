import { Optional } from './../../../interfaces/optional.interface';
import { TypeReference } from '../../../../../core/orders/enums/type-reference.enum';
import { PaymentMedia } from '../../../../../core/orders/enums/media-payment.enum';
import { FlowPayment } from '../../../interfaces/flow-payment.interface';
import { EventEmitter2 } from 'eventemitter2';
import { Status as StatusDispatch } from 'src/core/dispatches/enums/status.enum';
import { OrdersService } from '../../../../../core/orders/orders.service';
import { StatusResponse } from '../../../interfaces/flow-status-response.interface';
import { FlowBuilder } from '../../../builders/flow.builder';
import { FlowRequest } from '../../../enums/flow-request.enum';
import { Injectable } from '@nestjs/common';
import { DispatchesService } from 'src/core/dispatches/dispatches.service';
import { UsersService } from 'src/core/users/users.service';
import { CouponsService } from 'src/core/coupons/coupons.service';

@Injectable()
export class FlowPaymentService implements FlowPayment {
  constructor(
    private fb: FlowBuilder,
    private ordersService: OrdersService,
    private dispatchesService: DispatchesService,
    private usersService: UsersService,
    private eventEmitter: EventEmitter2,
    private couponsService: CouponsService,
  ) {}

  async build(amount: number, email: string, optional: Optional) {
    return this.fb
      .reset()
      .setAmount(amount)
      .setOptional(optional)
      .setSubject()
      .setEmail(email)
      .setCommerceOrder()
      .setUrlConfirmation()
      .setUrlReturn('flow/result/payment')
      .build(FlowRequest.CREATE);
  }

  async result(data: StatusResponse) {
    const { payer, paymentData, optional } = data;
    const { amount, date } = paymentData;
    const { _id } = await this.usersService.findOne({ email: payer });
    const order = await this.ordersService.create({
      user: _id,
      amount,
      payer,
      paymentDate: date,
      media: PaymentMedia.FLOW,
      reference: optional._id,
      typeReference: TypeReference.DISPATCH,
    });
    await this.update(optional);
    this.eventEmitter.emit('order.created', order);
  }

  private async update(optional: Optional) {
    const coupon = await this.couponsService.findOne({ code: optional.coupon }).select('code discountRate -_id');
    await this.dispatchesService.updateOne(optional._id, { status: StatusDispatch.PAID, coupon });
  }
}
