import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CaptureComponent } from '../../components/capture/capture.component';
import { DispatchsAgendadosColumns } from '../../shared/constants/dispatchs.constant';
import { filterOptions } from '../../shared/constants/order-filter.constant';
import { CouponCalculate } from '../../shared/helpers/coupon-discount.helper';
import { Subscription } from '../../shared/interfaces/subscription.interface';
import { SubscriptionsService } from '../../shared/services/subscriptions.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['../../pages/current-subscripcion/current-subscripcion.component.scss', '../../../shared/scss/main.scss'],
})
export class SubscriptionComponent {
  filterOptions = filterOptions;
  subscription: Subscription;
  columns = DispatchsAgendadosColumns;
  verPagar: boolean = false;
  info: { name: string; cant: any; icon: string; color: string }[] = [];

  constructor(
    private subscriptionsService: SubscriptionsService,
    private activedRoute: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) {}

  goBack() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.activedRoute.params.subscribe(({ _id }) => {
      this.subscriptionsService.getOne(_id).subscribe((subscription) => {
        this.subscription = subscription;
        console.log(subscription);
        if (this.subscription) this.setInfo();
      });
    });
  }

  showCapture() {
    this.dialog.open(CaptureComponent, { data: this.subscription.capture });
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
    if (this.subscription.coupon) {
      const more = [
        {
          name: 'Cupón Aplicado',
          cant: this.subscription.coupon.code,
          icon: 'dollar-sign',
          color: 'blue',
        },
        {
          name: 'Total pagado',
          cant: new CouponCalculate(this.subscription.amount, this.subscription.coupon!.discountRate).calculate(),
          icon: 'dollar-sign',
          color: 'blue',
        },
      ];
      this.info.push(...more);
    }
  }
}
