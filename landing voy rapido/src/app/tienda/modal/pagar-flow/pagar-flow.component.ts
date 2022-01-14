import { DispatchsService } from './../../shared/services/dispatchs.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Dispatch } from '../../shared/interfaces/dispatch.interface';
import { FlowService } from '../../shared/services/flow.service';

@Component({
  selector: 'app-pagar-flow',
  templateUrl: './pagar-flow.component.html',
  styleUrls: ['./pagar-flow.component.scss', '../../../shared/scss/modal-two.scss', '../../../shared/scss/form.scss'],
})
export class PagarFlowComponent {
  form: FormGroup;
  file: File;
  textImagen: string = 'Adjuntar comprobante';
  transferencia: boolean = false;

  @Input() ver: boolean = false;
  @Input() datos: Dispatch;
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() paid = new EventEmitter<boolean>();

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private flowService: FlowService,
    private dispatchesService: DispatchsService
  ) {
    this.form = this.fb.group({ coupon: [''] });
  }

  payment() {
    const coupon: string = this.form.value.coupon;
    this.flowService.payment(this.datos, coupon).subscribe(() => {}, this.error);
  }

  onUpload(event: any) {
    if (!event.target.files[0]) return;
    this.file = event.target.files[0];
    this.textImagen = this.file.name;
  }

  changeToRevision() {
    const coupon: string = this.form.value.coupon;
    this.dispatchesService.changeToRevision(this.datos, this.file, coupon).subscribe(this.success, this.error);
  }

  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
  };

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
    this.paid.emit(true);
    this.cerrar.emit(false);
  };
}
