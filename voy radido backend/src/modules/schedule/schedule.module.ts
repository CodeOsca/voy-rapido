import { SubscriptionsModule } from './../../core/subscriptions/subscriptions.module';
import { Module } from '@nestjs/common';
import { SubscriptionsScheduleService } from './services/subscriptions-schedule.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [SubscriptionsScheduleService],
  imports: [SubscriptionsModule, ScheduleModule.forRoot()],
})
export class SchedulesModule {}
