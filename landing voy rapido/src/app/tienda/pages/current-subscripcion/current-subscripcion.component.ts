import { DispatchsAgendadosColumns } from '../../shared/constants/dispatchs.constant';
import { SubscriptionsService } from '../../shared/services/subscriptions.service';
import { Component, AfterViewInit } from '@angular/core';
import { filterOptions } from '../../shared/constants/order-filter.constant';
import { Subscription } from '../../shared/interfaces/subscription.interface';

@Component({
  selector: 'app-current-subscripcion',
  templateUrl: './current-subscripcion.component.html',
  styleUrls: [
    '../../../shared/scss/main.scss',
    '../../../shared/scss/table.scss',
    './current-subscripcion.component.scss',
  ],
})
export class CurrentSubscripcionComponent implements AfterViewInit {
  isRevision = false;
  filterOptions = filterOptions;
  subscription: Subscription;
  columns = DispatchsAgendadosColumns;
  verPagar: boolean = false;
  info: { name: string; cant: any; icon: string; color: string }[] = [];

  constructor(private subscriptionsService: SubscriptionsService) {}

  ngAfterViewInit() {
    this.getSubscription();
  }

  getSubscription() {
    this.subscriptionsService.current.subscribe((subscription) => {
      this.subscription = subscription;
      if (this.subscription) {
        this.setInfo();
      } else {
        this.info = [];
        this.subscriptionsService.isRevision().subscribe((isRevision) => (this.isRevision = isRevision));
      }
    });
  }

  private setInfo() {
    this.info = [
      {
        name: 'Fecha de pago',
        cant: this.subscription.dateToPayment,
        icon: 'calendar-day',
        color: 'green',
      },
      {
        name: 'Monto',
        cant: this.subscription.amount,
        icon: 'dollar-sign',
        color: 'blue',
      },
    ];
  }

  clickPagar() {
    this.verPagar = true;
  }
}
