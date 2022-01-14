import { pluck } from 'rxjs/operators';
import { Notification } from '../interfaces/notifications.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private API = environment.API + 'notifications/';
  constructor(private socket: SocketService, private http: HttpClient) {}

  getAll() {
    return this.http.get<Notification[]>(this.API);
  }

  get notification() {
    return this.socket.fromEvent<Notification>('notification');
  }

  setAllInView() {
    return this.http
      .post(this.API + 'change-visibility', {})
      .pipe(pluck('message'));
  }
}
