import { Router } from '@angular/router';
import { SubscriptionsService } from './../../shared/services/subscriptions.service';
import { User } from 'src/app/tienda/shared/interfaces/user.interface';
import { AuthService } from './../../../auth/shared/services/auth.service';
import { DispatchsService } from '../../shared/services/dispatchs.service';
import { Component, AfterViewInit } from '@angular/core';
import { Confirmar } from '../../shared/interfaces/confirmar.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Dispatch } from '../../shared/interfaces/dispatch.interface';
import { DispatchsColumns } from '../../shared/constants/dispatchs.constant';
import { PaymentType } from '../../shared/enums/payment-type.enum';

@Component({
  selector: 'app-dispatches',
  templateUrl: './dispatches.component.html',
  styleUrls: ['../../../shared/scss/main.scss', '../../../shared/scss/table.scss', './dispatches.component.scss'],
})
export class DispatchesComponent implements AfterViewInit {
  user: User;
  datos: Confirmar = { titulo: '', mensaje: '', extra: null };
  verConfirmar: boolean = false;
  verPagar: boolean = false;
  textButton: string = 'Agendar fecha';
  fechaEliminar: Dispatch;
  dispatchs: Dispatch[] = [];
  columns = DispatchsColumns;
  dataDispatch: Dispatch;
  isSubscription = false;
  isAddSolicitud = false;
  isDeleteSolicitud = false;

  constructor(
    private alertService: AlertService,
    private dispatchsService: DispatchsService,
    private authService: AuthService,
    private subscriptionService: SubscriptionsService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.authService.currentProfile.subscribe((user) => {
      this.user = user;
    });
    this.getDispatchs();
  }

  hasPaymentMonthly() {
    return this.user?.paymentType === PaymentType.MONTHLY;
  }

  getDispatchs() {
    this.dispatchsService.getAllNotPayedOrSubscribed().subscribe((dispatches) => {
      this.dispatchs = dispatches;
      this.dataDispatch = this.dispatchs[0];
    });
  }

  clickEliminarFecha(data: Dispatch) {
    this.datos = {
      titulo: 'Eliminar retiro',
      mensaje: '¿Desea eliminar el siguiente retiro?',
      extra: data.retirementDate,
    };
    this.fechaEliminar = data;
    this.isDeleteSolicitud = true;
    this.verConfirmar = true;
  }

  clickPagar(data: Dispatch) {
    this.dataDispatch = data;
    this.verPagar = true;
  }

  dialogToSubcription(data: Dispatch) {
    this.datos = {
      titulo: 'Añadir retiro',
      mensaje: '¿Desea añadir el siguiente retiro al pago mensual?',
      extra: data.retirementDate,
    };
    this.dataDispatch = data;
    this.isSubscription = true;
    this.verConfirmar = true;
  }

  clickConfirmar(valor: boolean) {
    valor && this.isAddSolicitud && this.createDispatch();
    valor && this.isDeleteSolicitud && this.deleteDispatch();
    valor && this.isSubscription && this.addToSubscription();
    this.isSubscription = false;
    this.isAddSolicitud = false;
    this.isDeleteSolicitud = false;
  }

  createDispatch() {
    this.dispatchsService.create().subscribe((dispatch: Dispatch) => {
      this.router.navigate(['tienda/productos', dispatch._id]);
      this.alertService.setAlert({
        mensaje: 'Retiro agendado.',
        tipo: 'create',
      });
      this.success();
    }, this.error);
  }

  deleteDispatch() {
    this.dispatchsService.delete(this.fechaEliminar).subscribe(() => {
      this.alertService.setAlert({
        mensaje: 'Retiro eliminado.',
        tipo: 'delete',
      });
      this.success();
    }, this.error);
  }

  addToSubscription() {
    this.subscriptionService.set(this.dataDispatch).subscribe(() => {
      this.alertService.setAlert({
        mensaje: 'Retiro agregado al pago mensual.',
        tipo: 'success',
      });
      this.success();
    }, this.error);
  }

  private success = () => {
    this.getDispatchs();
    this.verConfirmar = false;
  };

  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
    this.verConfirmar = false;
  };
}
