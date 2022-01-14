import { User } from 'src/core/users/users.schema';
import { UsersService } from 'src/core/users/users.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/core/users/enums/role.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderDto } from 'src/core/orders/orders.schema';

@Injectable()
export class MailAdminService {
  constructor(
    private readonly mailerService: MailerService,
    private config: ConfigService,
    private usersService: UsersService,
  ) {}

  private get admin() {
    return this.usersService.findOne({ role: Role.ADMIN });
  }

  @OnEvent('user.register', { async: true })
  public async sendAccountVerification(user: User) {
    try {
      const { email } = await this.admin;
      await this.mailerService.sendMail({
        to: email,
        subject: 'Solicitud de verificación de cuenta ✔',
        template: 'account-verification-admin',
        context: {
          link: this.config.get('FRONTEND_URL'),
          user: {
            name: user.name,
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @OnEvent('order.created')
  public async sendOrderCreated(order: Partial<OrderDto>) {
    try {
      const { email } = await this.admin;
      await this.mailerService.sendMail({
        to: email,
        subject: 'Orden creada ✔',
        template: 'order-created',
        context: {
          link: this.config.get('FRONTEND_URL'),
          order: order._id,
          email: order.payer,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
