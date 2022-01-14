import { BuilderService } from './../builder/notification.builder';
import { Types } from 'mongoose';
import { UsersService } from '../../../core/users/users.service';
import { Coupons } from '../../../core/coupons/coupons.schema';
import { NotificationsGateway } from '../notifications.gateway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsCouponsService {
  constructor(
    private builder: BuilderService,
    private notificationGateway: NotificationsGateway,
    private usersService: UsersService,
  ) {}

  @OnEvent('coupon.send', { async: true })
  async sendCuponToUsers(coupon: Coupons, usersID: Types.ObjectId[]) {
    const users = await this.usersService.findByArray(usersID);
    for (let i = 0; i < users.length; i++) {
      const description = `Su código es ${coupon.code} Con un porcentaje de descuento del ${coupon.discountRate}%.`;
      const notification = await this.builder
        .setTitle('Cupón 🎁')
        .setDescription(description)
        .setUserID(users[i]._id)
        .build();
      await this.notificationGateway.sendNotification(users[i]._id, notification);
    }
  }
}
