import { SubscriptionsService } from './../../shared/services/subscriptions.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Subscription } from '../../shared/interfaces/subscription.interface';
import { FlowService } from '../../shared/services/flow.service';

@Component({
  selector: 'app-pagar-flow-subscription',
  templateUrl: './pagar-flow-subscription.component.html',
  styleUrls: [
    '../pagar-flow/pagar-flow.component.scss',
    '../../../shared/scss/modal-two.scss',
    '../../../shared/scss/form.scss',
  ],
})
export class PagarFlowSubscriptionComponent {
  form: FormGroup;
  transferencia: boolean = false;
  textImagen: string = 'Adjuntar comprobante';
  file: File;
  @Input() ver: boolean = false;
  @Input() subscription: Subscription;
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() paid = new EventEmitter<boolean>();

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private flowService: FlowService,
    private subscriptionsService: SubscriptionsService
  ) {
    this.form = this.fb.group({ coupon: [''] });
  }

  payment() {
    const coupon: string = this.form.value.coupon;
    this.flowService.paymentSubscription(this.subscription, coupon).subscribe(() => {}, this.error);
  }

  onUpload(event: any) {
    if (!event.target.files[0]) return;
    this.file = event.target.files[0];
    this.textImagen = this.file.name;
  }

  changeToRevision() {
    const coupon: string = this.form.value.coupon;
    this.subscriptionsService
      .changeToRevision(this.subscription, this.file, coupon)
      .subscribe(this.success, this.error);
  }

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
    this.paid.emit(true);
    this.cerrar.emit(false);
  };

  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
  };
}
