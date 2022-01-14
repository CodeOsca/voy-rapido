import { Notifications, NotificationsDocument } from '../notifications.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private notifications: Model<NotificationsDocument>,
  ) {}

  findAll(field: Partial<Notifications> = {}) {
    return this.notifications.find(field).sort('-createdAt');
  }

  findOne(field: Partial<Notifications & { _id: string }> = {}) {
    return this.notifications.findOne(field);
  }

  changeVisibilityToView() {
    return this.notifications.updateMany({}, { wasSeen: true });
  }

  create(notification: Notifications) {
    return this.notifications.create(notification);
  }
}
