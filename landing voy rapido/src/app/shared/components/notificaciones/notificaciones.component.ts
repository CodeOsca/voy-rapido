import { AlertService } from './../../services/alert.service';
import { Notification } from '../../interfaces/notifications.interface';
import { NotificationsService } from '../../services/notifications.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
})
export class NotificacionesComponent implements OnInit {
  private amountNotSeenCounter = 0;
  focusComponent: boolean = true;
  notifications: Notification[] = [];
  amountOfNotifications = 9;
  @Input() verNotificaciones: boolean = false;
  @Output() closeNotificacion = new EventEmitter<boolean>();
  @Output() amountNotSeen = new EventEmitter<number>();

  constructor(
    private notificationsService: NotificationsService,
    private alertService: AlertService
  ) {}

  @HostListener('click')
  clickInside() {
    this.focusComponent = true;
  }

  @HostListener('document:click')
  clickout() {
    if (this.focusComponent && this.verNotificaciones) {
      this.focusComponent = false;
    } else {
      this.closeNotificacion.emit(false);
      this.focusComponent = true;
    }
  }

  ngOnInit(): void {
    this.getNotifications();
    this.notificationsService.notification.subscribe((notification) => {
      this.notifications.unshift(notification);
      this.amountNotSeen.emit(++this.amountNotSeenCounter);
    });
  }

  getNotifications = () => {
    this.notificationsService.getAll().subscribe((notifications) => {
      this.notifications = notifications.slice(0, this.amountOfNotifications);
      this.amountNotSeen.emit(this.getNotSeen(notifications));
    });
  };

  setAllInView() {
    this.notificationsService
      .setAllInView()
      .subscribe(this.getNotifications, this.error);
  }

  close() {
    this.closeNotificacion.emit(false);
  }

  error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
  };

  private getNotSeen(notifications: Notification[]) {
    const predicate = (notification) => notification.wasSeen === false;
    this.amountNotSeenCounter = notifications.filter(predicate).length;
    return this.amountNotSeenCounter;
  }
}
