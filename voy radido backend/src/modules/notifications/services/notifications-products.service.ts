import { DispatchesService } from './../../../core/dispatches/dispatches.service';
import { BuilderService } from './../builder/notification.builder';
import { NotificationsGateway } from '../notifications.gateway';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductDto } from 'src/core/products/products.schema';

@Injectable()
export class NotificationsProductsService {
  constructor(
    private builder: BuilderService,
    private notificationGateway: NotificationsGateway,
    private dispatchesService: DispatchesService,
  ) {}

  @OnEvent('product.reschedule', { async: true })
  async rescheduleDeliveryDate(product: ProductDto, deliveryDate: string) {
    const dispatch = await this.dispatchesService.findByProduct(product._id);
    const notification = await this.builder
      .setTitle(`Reagendamiento 🗓️`)
      .setUserID(dispatch.user)
      .setDescription(
        `Su fecha de envío del producto para (${product.deliveryName}) ha sido reagendada al (${new Date(
          deliveryDate,
        ).toLocaleDateString()}).`,
      )
      .build();
    await this.notificationGateway.sendNotification(dispatch.user, notification);
  }

  @OnEvent('product.change-amount', { async: true })
  async changeAmount(product: ProductDto) {
    const dispatch = await this.dispatchesService.findByProduct(product._id);
    const notification = await this.builder
      .setTitle(`Cambio de valor 💵`)
      .setUserID(dispatch.user)
      .setDescription(
        `El valor total de su producto para (${product.deliveryName}), ha sido modificado por el administrador.`,
      )
      .build();
    await this.notificationGateway.sendNotification(dispatch.user, notification);
  }
}
