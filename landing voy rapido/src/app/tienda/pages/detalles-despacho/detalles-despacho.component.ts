import { CaptureComponent } from './../../components/capture/capture.component';
import { CouponCalculate } from './../../shared/helpers/coupon-discount.helper';
import { DispatchsService } from './../../shared/services/dispatchs.service';
import { Dispatch } from './../../shared/interfaces/dispatch.interface';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../shared/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsDetailsDispatchColumns } from '../../shared/constants/products.constant';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-detalles-despacho',
  templateUrl: './detalles-despacho.component.html',
  styleUrls: [
    '../../../shared/scss/main.scss',
    '../../../shared/scss/table.scss',
    '../../../shared/scss/form.scss',
    './detalles-despacho.component.scss',
  ],
})
export class DetallesDespachoComponent implements OnInit {
  private currentDispatchID: string;
  verProduct = false;
  product: Product;
  columns = ProductsDetailsDispatchColumns;
  products: Product[] = [];
  dispatch: Dispatch;

  constructor(
    private alert: AlertService,
    private activedRoute: ActivatedRoute,
    private dispatchesService: DispatchsService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  goBack() {
    this.location.back();
  }

  get discount() {
    return new CouponCalculate(this.dispatch.amount, this.dispatch.coupon!.discountRate).calculate();
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(({ _id }) => {
      this.currentDispatchID = _id;
      this.getDispatch();
    });
  }

  showCapture() {
    this.dialog.open(CaptureComponent, { data: this.dispatch.capture });
  }

  getDispatch() {
    this.dispatchesService.getOne(this.currentDispatchID).subscribe((dispatch) => {
      this.dispatch = dispatch;
      this.products = this.dispatch.products;
    }, this.error);
  }

  clickVerDetalles(product: Product) {
    this.product = product;
    this.verProduct = true;
  }

  private error = (message: string) => {
    this.alert.setAlert({ mensaje: message, tipo: 'error' });
  };
}
