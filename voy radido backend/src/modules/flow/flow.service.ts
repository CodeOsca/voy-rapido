import { Optional } from './interfaces/optional.interface';
import { FlowSubscriptionService } from './models/payments/flow/subscription.model';
import { FlowPaymentService } from './models/payments/flow/payment.model';
import { SubscriptionsService } from './../../core/subscriptions/subscriptions.service';
import { AmountCalculator } from './models/calculator/amount-calculator.model';
import { UsersService } from './../../core/users/users.service';
import { StatusResponse } from './interfaces/flow-status-response.interface';
import { FlowBuilder } from './builders/flow.builder';
import { FlowRequest } from './enums/flow-request.enum';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Status } from './enums/flow-status.enum';
import { Types } from 'mongoose';
import { FlowPayment } from './interfaces/flow-payment.interface';

@Injectable()
export class FlowService {
  constructor(
    private flowPaymentService: FlowPaymentService,
    private flowSubscriptionService: FlowSubscriptionService,
    private amountCalculator: AmountCalculator,
    private usersService: UsersService,
    private subscriptionsService: SubscriptionsService,
    private fb: FlowBuilder,
  ) {}

  async paymentSubscription(userID: Types.ObjectId, subscriptionID: Types.ObjectId, coupon: string) {
    const { dispatches } = await this.subscriptionsService.findOne({ _id: subscriptionID });
    const amount = await this.amountCalculator.calculate(dispatches, coupon);
    return this.getURL(amount, userID, { _id: subscriptionID, coupon }, this.flowSubscriptionService);
  }

  async payment(userID: Types.ObjectId, dispatchID: Types.ObjectId, coupon: string) {
    const amount = await this.amountCalculator.calculate([dispatchID], coupon);
    return this.getURL(amount, userID, { _id: dispatchID, coupon }, this.flowPaymentService);
  }

  private async getURL(amount: number, userID: Types.ObjectId, optional: Optional, service: FlowPayment) {
    try {
      const { email } = await this.usersService.findOne({ _id: userID });
      const { url, params } = await service.build(amount, email, optional);
      const { data } = await axios.post(url, params);
      return data.url + '?token=' + data.token;
    } catch (error) {
      throw error.response.data;
    }
  }

  async resultPayment(token: string) {
    const data = await this.getStatusResponse(token);
    if (data) this.flowPaymentService.result(data);
  }

  async resultSubscription(token: string) {
    const data = await this.getStatusResponse(token);
    if (data) this.flowSubscriptionService.result(data);
  }

  private async getStatusResponse(token: string) {
    const { url, params } = this.fb.setToken(token).build(FlowRequest.STATUS);
    try {
      const { data } = await axios.get<StatusResponse>(url + '?' + params);
      if (data.status === Status.PAID) return data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
