import { BuilderService } from './../builder/notification.builder';
import { UsersService } from './../../../core/users/users.service';
import { NotificationsGateway } from '../notifications.gateway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Role } from 'src/core/users/enums/role.enum';
import { SubscriptionsDto } from 'src/core/subscriptions/subscriptions.schema';

@Injectable()
export class NotificationsSubscriptionsService {
  constructor(
    private builder: BuilderService,
    private notificationGateway: NotificationsGateway,
    private usersService: UsersService,
  ) {}

  @OnEvent('subscription.revision', { async: true })
  async changeToRevision(subscription: SubscriptionsDto) {
    const admin = await this.usersService.findOne({ role: Role.ADMIN });
    const user = await this.usersService.findOne({ _id: subscription.user });
    const notification = await this.builder
      .setTitle(`Pago en revisión✔️`)
      .setUserID(admin._id)
      .setDescription(`${user.storeName}, Solicita Revisión de pago.`)
      .build();
    await this.notificationGateway.sendNotification(admin._id, notification);
  }

  @OnEvent('subscription.transfer.payment', { async: true })
  async transferPayment(subscription: SubscriptionsDto) {
    const notification = await this.builder
      .setTitle(`Pago aprobado✔️`)
      .setUserID(subscription.user)
      .setDescription(`Su pago mensual del (${subscription.dateToPayment}) ha sido aprobado.`)
      .build();
    await this.notificationGateway.sendNotification(subscription.user, notification);
  }

  @OnEvent('subscription.transfer.rejected', { async: true })
  async transferPaymentReejcted(subscription: SubscriptionsDto) {
    const user = await this.usersService.findOne({ _id: subscription.user });
    const notification = await this.builder
      .setTitle(`Pago rechazado ❌`)
      .setUserID(subscription.user)
      .setDescription(`Su pago mensual del (${subscription.dateToPayment}) ha sido rechazado.`)
      .build();
    await this.notificationGateway.sendNotification(subscription.user, notification);
  }
}
