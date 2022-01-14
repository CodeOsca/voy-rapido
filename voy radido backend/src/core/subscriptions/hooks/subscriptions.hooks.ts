import { DispatchesDocument } from './../../dispatches/dispatches.schema';
import { SubscriptionsService } from 'src/core/subscriptions/subscriptions.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { SubscriptionsDocument } from '../subscriptions.schema';

@Injectable()
export class HooksRecorder {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @OnEvent('Dispatch.post.save')
  async save(dispatch: DispatchesDocument) {
    const subscription = await this.subscriptionsService.findByDispatch(dispatch._id);
    if (!!subscription) {
      await this.updateAmount(subscription);
      await subscription.save();
    }
  }

  private async updateAmount(subscription: SubscriptionsDocument) {
    await subscription.populate('dispatches').execPopulate();
    subscription.amount = subscription.dispatches.reduce((acc, dispatch) => acc + dispatch['amount'], 0);
  }
}
