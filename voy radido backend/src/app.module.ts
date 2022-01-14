import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { CommuneModule } from './core/communes/commune.module';
import { DispatchesModule } from './core/dispatches/dispatches.module';
import { OrdersModule } from './core/orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { PhotosModule } from './core/photos/photos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FlowModule } from './modules/flow/flow.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CouponsModule } from './core/coupons/coupons.module';
import { ProductsModule } from './core/products/products.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SubscriptionsModule } from './core/subscriptions/subscriptions.module';
import { SchedulesModule } from './modules/schedule/schedule.module';
import { MongoHooksEventModule } from './modules/mongo-hooks-event/mongo-hooks-event.module';

@Module({
  imports: [
    SharedModule,
    CommuneModule,
    DispatchesModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    MailModule,
    CommandModule,
    PhotosModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      renderPath: 'photos',
      serveRoot: '/voyrapido/api/v1',
      rootPath: join(process.cwd(), 'uploads'),
    }),
    EventEmitterModule.forRoot(),
    FlowModule,
    NotificationsModule,
    CouponsModule,
    ProductsModule,
    SubscriptionsModule,
    SchedulesModule,
    MongoHooksEventModule,
  ],
})
export class AppModule {}
