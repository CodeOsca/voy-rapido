import { EventEmitter2 } from '@nestjs/event-emitter';
import { SubscriptionsService } from './../../../core/subscriptions/subscriptions.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateString } from 'src/shared/services/date/date-string.service';

@Injectable()
export class SubscriptionsScheduleService {
  constructor(private subscriptionsService: SubscriptionsService, private eventEmitter: EventEmitter2) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, { timeZone: 'America/Santiago' })
  //@Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const date = new DateString();
    date.subtractDay(5);
    const subscriptions = await this.subscriptionsService.findAll({ dateToPayment: date.DateLastDayOfTheMonth.date });
    for (const subscription of subscriptions) {
      subscription.canPay = true;
      await subscription.save();
      this.eventEmitter.emit('user.subscription.canPay', subscription.user);
    }
  }
}
