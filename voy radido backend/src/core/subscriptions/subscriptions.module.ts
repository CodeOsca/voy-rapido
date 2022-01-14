import { CouponsModule } from './../coupons/coupons.module';
import { isRevisionSubscriptionConstraint } from './validators/is-revision.validator';
import { SharedModule } from './../../shared/shared.module';
import { UnpaidOutSubscriptionConstraint } from './validators/unpaid-out-subscription.validator';
import { IsTimeToPayConstraint } from './validators/is-time-to-pay.validator';
import { DispatchesModule } from './../dispatches/dispatches.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriptions, SubscriptionsSchema } from './subscriptions.schema';
import { diskStorage } from 'multer';
import { setFileName } from '../photos/helpers/filename.helper';
import { onlyImage } from '../photos/validators/only-image.validator';
import { MulterModule } from '@nestjs/platform-express';
import { MongoHooksEventService } from 'src/modules/mongo-hooks-event/mongo-hooks-event.service';
import { HooksRecorder } from './hooks/subscriptions.hooks';
import { HaveNoDebtConstraint } from './validators/have-no-debt.validator';

@Module({
  imports: [
    CouponsModule,
    UsersModule,
    DispatchesModule,
    SharedModule,
    MongooseModule.forFeatureAsync([
      {
        name: Subscriptions.name,
        useFactory: (mongoEvent: MongoHooksEventService) => {
          return mongoEvent.forSchema(Subscriptions.name, SubscriptionsSchema);
        },
        inject: [MongoHooksEventService],
      },
    ]),
    MulterModule.register({
      fileFilter: onlyImage,
      storage: diskStorage({ filename: setFileName, destination: 'uploads' }),
    }),
  ],
  providers: [
    SubscriptionsService,
    IsTimeToPayConstraint,
    UnpaidOutSubscriptionConstraint,
    isRevisionSubscriptionConstraint,
    HaveNoDebtConstraint,
    HooksRecorder,
  ],
  controllers: [SubscriptionsController],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
