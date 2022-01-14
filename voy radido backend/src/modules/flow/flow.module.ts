import { TransferSubscriptionService } from './models/payments/transfer/subscription.model';
import { TransferPaymentService } from './models/payments/transfer/payment.model';
import { FlowSubscriptionService } from './models/payments/flow/subscription.model';
import { FlowPaymentService } from './models/payments/flow/payment.model';
import { DispatchesCalculator } from './models/calculator/dispatches-calculator.model';
import { CouponsModule } from './../../core/coupons/coupons.module';
import { CouponCalculator } from './models/calculator/coupon-calculator.model';
import { AmountCalculator } from './models/calculator/amount-calculator.model';
import { NotificationsModule } from './../notifications/notifications.module';
import { MailModule } from './../mail/mail.module';
import { OrdersModule } from './../../core/orders/orders.module';
import { DispatchesModule } from './../../core/dispatches/dispatches.module';
import { UsersModule } from 'src/core/users/users.module';
import { FlowBuilder } from './builders/flow.builder';
import { Module } from '@nestjs/common';
import { FlowController } from './flow.controller';
import { SubscriptionsModule } from 'src/core/subscriptions/subscriptions.module';
import { FlowService } from './flow.service';

@Module({
  imports: [
    UsersModule,
    DispatchesModule,
    OrdersModule,
    MailModule,
    NotificationsModule,
    CouponsModule,
    SubscriptionsModule,
  ],
  controllers: [FlowController],
  providers: [
    FlowService,
    FlowBuilder,
    AmountCalculator,
    CouponCalculator,
    DispatchesCalculator,
    FlowPaymentService,
    FlowSubscriptionService,
    TransferPaymentService,
    TransferSubscriptionService,
  ],
})
export class FlowModule {}
