import { BuilderService } from './../builder/notification.builder';
import { DispatchDto } from './../../../core/dispatches/dispatches.schema';
import { UsersService } from './../../../core/users/users.service';
import { NotificationsGateway } from '../notifications.gateway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Role } from 'src/core/users/enums/role.enum';
import { DateString } from 'src/shared/services/date/date-string.service';

@Injectable()
export class NotificationsDispatchesService {
  constructor(
    private builder: BuilderService,
    private notificationGateway: NotificationsGateway,
    private usersService: UsersService,
  ) {}

  @OnEvent('dispatch.reschedule.retirement-date', { async: true })
  async rescheduleRetirementDate(dispatch: DispatchDto) {
    const retirementDate = new DateString();
    retirementDate.set(dispatch.retirementDate);

    const notification = await this.builder
      .setTitle(`Reagendamiento 🗓️`)
      .setUserID(dispatch.user)
      .setDescription(`Su fecha de retiro ha sido reagendada al (${retirementDate.date}).`)
      .build();
    await this.notificationGateway.sendNotification(dispatch.user, notification);
  }

  @OnEvent('dispatch.revision', { async: true })
  async changeToRevision(dispatch: DispatchDto) {
    const admin = await this.usersService.findOne({ role: Role.ADMIN });
    const user = await this.usersService.findOne({ _id: dispatch.user });
    const notification = await this.builder
      .setTitle(`Pago en revisión✔️`)
      .setUserID(admin._id)
      .setDescription(`${user.storeName}, Solicita Revisión de pago.`)
      .build();
    await this.notificationGateway.sendNotification(admin._id, notification);
  }

  @OnEvent('dispatch.transfer.payment', { async: true })
  async transferPayment(dispatch: DispatchDto) {
    const notification = await this.builder
      .setTitle(`Pago aprobado✔️`)
      .setUserID(dispatch.user)
      .setDescription(`Su pago del despacho del (${dispatch.retirementDate}) ha sido aprobado.`)
      .build();
    await this.notificationGateway.sendNotification(dispatch.user, notification);
  }

  @OnEvent('dispatch.transfer.rejected', { async: true })
  async transferPaymentReejcted(dispatch: DispatchDto) {
    const notification = await this.builder
      .setTitle(`Pago rechazado ❌`)
      .setUserID(dispatch.user)
      .setDescription(`Su pago del despacho (${dispatch.retirementDate}) ha sido rechazado.`)
      .build();
    await this.notificationGateway.sendNotification(dispatch.user, notification);
  }

  @OnEvent('dispatch.change-amount', { async: true })
  async changeAmount(dispatch: DispatchDto) {
    const notification = await this.builder
      .setTitle(`Cambio de valor 💵`)
      .setUserID(dispatch.user)
      .setDescription(
        `El valor total de tu retiro del (${dispatch.retirementDate}), ha sido modificado por el administrador.`,
      )
      .build();
    await this.notificationGateway.sendNotification(dispatch.user, notification);
  }
}
