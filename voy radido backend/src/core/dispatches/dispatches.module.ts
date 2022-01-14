import { IsPreviousDateConstraint } from 'src/core/dispatches/validators/is-previous-date.validator';
import { CouponsModule } from './../coupons/coupons.module';
import { isRevisionDispatchConstraint } from './validators/is-revision.validator';
import { EventEmitterHooksRecorder } from './hooks/event-emitter-hooks';
import { HooksRecorder } from './hooks/dispatches.hooks';
import { MongoHooksEventService } from './../../modules/mongo-hooks-event/mongo-hooks-event.service';
import { IsPreviousDateRescheduleConstraint } from './validators/is-previous-date.-reschedule.validator';
import { PaidOutDispatchesConstraint } from './validators/paid-out.validator';
import { Dispatch, DispatchesSchema } from './dispatches.schema';
import { Module } from '@nestjs/common';
import { DispatchesService } from './dispatches.service';
import { DispatchesController } from './dispatches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UnpaidOutDispatchesConstraint } from './validators/unpaid-out-dispatches.validator';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { setFileName } from '../photos/helpers/filename.helper';
import { onlyImage } from '../photos/validators/only-image.validator';
import { UsersModule } from '../users/users.module';
import { IsDayAvailableConstraint } from './validators/is-day-available.validator';
import { CanRemoveConstraint } from './validators/can-remove.dto';

@Module({
  imports: [
    UsersModule,
    CouponsModule,
    MongooseModule.forFeatureAsync([
      {
        name: Dispatch.name,
        useFactory: (mongoEvent: MongoHooksEventService) => {
          return mongoEvent.forSchema(Dispatch.name, DispatchesSchema);
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
    DispatchesService,
    PaidOutDispatchesConstraint,
    IsPreviousDateRescheduleConstraint,
    UnpaidOutDispatchesConstraint,
    HooksRecorder,
    EventEmitterHooksRecorder,
    isRevisionDispatchConstraint,
    IsDayAvailableConstraint,
    CanRemoveConstraint,
    IsPreviousDateConstraint,
  ],
  controllers: [DispatchesController],
  exports: [DispatchesService],
})
export class DispatchesModule {}
