import { DispatchesModule } from './../../core/dispatches/dispatches.module';
import { BuilderService } from './builder/notification.builder';
import { OrdersModule } from './../../core/orders/orders.module';
import { NotificationsOrdersService } from './services/notifications-order.service';
import { NotificationsCouponsService } from './services/notifications-coupons.service';
import { UsersModule } from './../../core/users/users.module';
import { NotificationsUsersService } from './services/notifications-users.service';
import { Notifications, NotificationsSchema } from './notifications.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './services/notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsDispatchesService } from './services/notifications-dispatches.service';
import { NotificationsSubscriptionsService } from './services/notifications-subscriptions.service';
import { NotificationsProductsService } from './services/notifications-products.service';

@Module({
  imports: [
    UsersModule,
    OrdersModule,
    DispatchesModule,
    MongooseModule.forFeature([{ name: Notifications.name, schema: NotificationsSchema }]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsUsersService,
    NotificationsCouponsService,
    NotificationsOrdersService,
    NotificationsDispatchesService,
    NotificationsGateway,
    NotificationsSubscriptionsService,
    NotificationsProductsService,
    BuilderService,
  ],
  exports: [],
})
export class NotificationsModule {}
