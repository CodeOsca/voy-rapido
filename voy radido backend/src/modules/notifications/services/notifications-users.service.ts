import { UserDto } from './../../../core/users/users.schema';
import { BuilderService } from './../builder/notification.builder';
import { Types } from 'mongoose';
import { NotificationsGateway } from '../notifications.gateway';
import { UsersService } from 'src/core/users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/core/users/users.schema';
import { Role } from 'src/core/users/enums/role.enum';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationsUsersService {
  constructor(
    private builder: BuilderService,
    private usersService: UsersService,
    private notificationGateway: NotificationsGateway,
  ) {}

  private get admin() {
    return this.usersService.findOne({ role: Role.ADMIN });
  }

  @OnEvent('user.register', { async: true })
  async sendRegister(user: User) {
    const { _id } = await this.admin;
    const notification = await this.builder
      .setTitle('Solicitud de cuenta 👐')
      .setUserID(_id)
      .setDescription(`La cuenta ${user.email} quiere unirse al sistema`)
      .build();
    await this.notificationGateway.sendNotification(_id, notification);
  }

  @OnEvent('user.subscription.enable', { async: true })
  async sendSubscriptionEnable(user: UserDto) {
    const notification = await this.builder
      .setTitle('Pago mensual ✔️')
      .setUserID(user._id)
      .setDescription(`El método (PAGO MENSUAL) ha sido habilitado.`)
      .build();
    await this.notificationGateway.sendNotification(user._id, notification);
  }

  @OnEvent('user.subscription.disabled', { async: true })
  async sendSubscriptionDisabled(user: UserDto) {
    const notification = await this.builder
      .setTitle('Pago mensual ❌')
      .setUserID(user._id)
      .setDescription(`El método (PAGO MENSUAL) ha sido deshabilitado.`)
      .build();
    await this.notificationGateway.sendNotification(user._id, notification);
  }

  @OnEvent('user.subscription.canPay', { async: true })
  async sendSubscriptionCanPay(userID: Types.ObjectId) {
    const user = await this.usersService.findOne({ _id: userID });
    const notification = await this.builder
      .setTitle('Pago mensual 💵')
      .setUserID(user._id)
      .setDescription(`Es hora de pagar el acumulado.`)
      .build();
    await this.notificationGateway.sendNotification(user._id, notification);
  }
}
