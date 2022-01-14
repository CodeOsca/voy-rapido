import { UsersService } from 'src/core/users/users.service';
import { OrderDto } from './../../../core/orders/orders.schema';
import { User } from 'src/core/users/users.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MailUserService {
  constructor(
    private readonly mailerService: MailerService,
    private config: ConfigService,
    private usersService: UsersService,
  ) {}

  @OnEvent('user.forgot', { async: true })
  public async sendForgotPassword(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Recuperar contraseña ✔',
        template: 'forgot-password',
        context: {
          link: this.config.get('FRONTEND_URL') + '#/nueva-credencial/' + token,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @OnEvent('user.register', { async: true })
  public async sendAccountVerification(user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Solicitud de verificación de cuenta ✔',
        template: 'account-verification-user',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @OnEvent('user.accepted')
  public async sendAccountVerificationAccepted(user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Respuesta de verificación de cuenta ✔',
        template: 'account-accepted',
        context: {
          link: this.config.get('FRONTEND_URL'),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @OnEvent('user.rejected', { async: true })
  public async sendAccountVerificationRejected(user: User) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Respuesta de verificación de cuenta ✔',
        template: 'account-rejected',
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
