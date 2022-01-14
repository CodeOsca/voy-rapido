import { SubscriptionsService } from './../../shared/services/subscriptions.service';
import { DispatchsService } from './../../shared/services/dispatchs.service';
import { NotificationsService } from './../../../shared/services/notifications.service';
import { Columns } from './../../../shared/interfaces/columns.interface';
import { Notification } from './../../../shared/interfaces/notifications.interface';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['../../../shared/scss/table.scss', './actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {
  notifications: Notification[] = [];
  dispatchesInRevision: { _id: string; amount: number }[] = [];
  subscriptionsInRevision: { _id: string; amount: number }[] = [];
  filterOptions = ['CUPÓN', 'ORDEN', 'REAGENDAMIENTO'];
  columns: Columns = {
    columns: [],
    columnsSelect: ['notification'],
    displayedColumns: ['notification'],
    480: ['notification'],
    680: ['notification'],
    768: ['notification'],
    1024: ['notification'],
  };

  constructor(
    private notificationsService: NotificationsService,
    private dispatchesService: DispatchsService,
    private subscriptionsService: SubscriptionsService
  ) {}

  get hasRevisions() {
    return this.dispatchesInRevision.length > 0 || this.subscriptionsInRevision.length > 0;
  }

  ngOnInit(): void {
    this.notificationsService.getAll().subscribe((notifications) => {
      this.notifications = notifications;
    });
    forkJoin([this.dispatchesService.getAllRevision(), this.subscriptionsService.getAllRevision()]).subscribe(
      ([dispatches, subscriptions]) => {
        this.dispatchesInRevision = dispatches;
        this.subscriptionsInRevision = subscriptions;
      }
    );
  }
}
