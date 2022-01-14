import { Status as StatusDispatch } from './../dispatches/enums/status.enum';
import { DispatchesService } from './../dispatches/dispatches.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subscriptions, SubscriptionsDocument, SubscriptionsDto } from './subscriptions.schema';
import { Status } from './enums/status.enum';
import { DateString } from 'src/shared/services/date/date-string.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscriptions.name)
    private subscriptions: Model<SubscriptionsDocument>,
    private dispatchesService: DispatchesService,
  ) {}

  findAll(field: Partial<SubscriptionsDto> = {}) {
    return this.subscriptions.find(field);
  }

  findOne(field: Partial<SubscriptionsDto>) {
    return this.subscriptions.findOne(field);
  }

  async updateOne(_id: Types.ObjectId, subscriptionDto: Partial<SubscriptionsDto>) {
    let subscription = await this.findOne({ _id });
    Object.assign(subscription, subscriptionDto);
    return subscription.save();
  }

  exists(user_id: Types.ObjectId) {
    return this.subscriptions.findOne({ user: user_id, status: Status.UNPAID });
  }

  findByDispatch(dispatchID: Types.ObjectId) {
    return this.subscriptions.findOne({ dispatches: { $in: [dispatchID] } });
  }

  async insert(subscription: SubscriptionsDocument, dispatch: Types.ObjectId) {
    subscription.dispatches.push(dispatch);
    const saved = await subscription.save(); //se debe cumplir este orden strictamente
    await this.dispatchesService.updateOne(dispatch, { status: StatusDispatch.SUBSCRIPTION });
    return saved;
  }

  async create(user: Types.ObjectId, dispatch: Types.ObjectId) {
    const subscription = await this.subscriptions.create({
      user,
      dispatches: [dispatch],
      amount: 0,
      dateToPayment: new DateString().DateLastDayOfTheMonth.date,
    });
    await this.dispatchesService.updateOne(dispatch, { status: StatusDispatch.SUBSCRIPTION });
    return subscription.save();
  }
}
