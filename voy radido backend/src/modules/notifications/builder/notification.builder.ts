import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Notifications } from '../notifications.schema';
import { NotificationsService } from '../services/notifications.service';

@Injectable()
export class BuilderService {
  private _title: string = '';
  private _userID: Types.ObjectId;
  private _description: string = '';

  constructor(private notificationsService: NotificationsService) {}

  setTitle(title: string) {
    this._title = title;
    return this;
  }

  setUserID(userID: Types.ObjectId) {
    this._userID = userID;
    return this;
  }

  setDescription(description: string) {
    this._description = description;
    return this;
  }

  build() {
    const newNotification: Notifications = {
      user: this._userID,
      title: this._title,
      description: this._description,
      wasSeen: false,
    };
    return this.notificationsService.create(newNotification);
  }
}
