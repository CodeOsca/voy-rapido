import { BuilderService } from './../builder/notification.builder';
import { UsersService } from './../../../core/users/users.service';
import { Orders } from './../../../core/orders/orders.schema';
import { NotificationsGateway } from '../notifications.gateway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Role } from 'src/core/users/enums/role.enum';

@Injectable()
export class NotificationsOrdersService {
  constructor(
    private builder: BuilderService,
    private notificationGateway: NotificationsGateway,
    private usersService: UsersService,
  ) {}

  private get admin() {
    return this.usersService.findOne({ role: Role.ADMIN });
  }

  @OnEvent('order.created', { async: true })
  async sendOrderCreated(order: Partial<Orders>) {
    const { _id } = await this.admin;
    const notification = await this.builder
      .setTitle('Orden 🚙')
      .setUserID(_id)
      .setDescription(`El usuario ${order.payer} ha creado una orden`)
      .build();
    await this.notificationGateway.sendNotification(_id, notification);
  }
}
