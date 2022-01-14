import { UsersModule } from './../../core/users/users.module';
import { MailAdminService } from './services/mail-admin.service';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailUserService } from './services/mail-user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"Voy-Rapido" <example@gmail.com>',
        },
        template: {
          dir: process.cwd() + '/src/modules/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailUserService, MailAdminService],
  exports: [MailUserService, MailAdminService],
})
export class MailModule {}
