import { Product } from './../../shared/interfaces/product.interface';
import { ProductsColumns } from './../../shared/constants/products.constant';
import { ActivatedRoute } from '@angular/router';
import { Dispatch } from './../../shared/interfaces/dispatch.interface';
import { DispatchsService } from './../../shared/services/dispatchs.service';
import { ExcelService } from '../../shared/services/excel.service';
import { Component, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Confirmar } from '../../shared/interfaces/confirmar.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    '../../../shared/scss/main.scss',
    '../../../shared/scss/table.scss',
    './products.component.scss',
  ],
})
export class ProductsComponent implements AfterContentInit {
  formFile: FormGroup;
  product: Product;
  dispatch: Dispatch;
  verProduct: boolean = false;
  verAddProduct: boolean = false;
  columns = ProductsColumns;
  selection: Product[];
  datos: Confirmar = { titulo: '', mensaje: '', extra: null };
  verConfirmar: boolean = false;
  isDeleteProduct: boolean = false;
  isDeleteMasivaProduct: boolean = false;
  isEditProduct: boolean = false;
  productAEliminar: Product;
  products: Product[];
  file: File | null;
  _id: any;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private excelService: ExcelService,
    private productsService: ProductsService,
    private dispatchService: DispatchsService,
    private activedRoute: ActivatedRoute
  ) {
    this.formFile = this.fb.group({
      file: [null],
    });
  }

  ngAfterContentInit() {
    this.activedRoute.paramMap.subscribe((paramMap) => {
      this._id = paramMap.get('_id');
      if (this._id) {
        this.setData(this._id);
      }
    });
  }

  setData = (dispatch_id: string) => {
    this.dispatchService.getOne(dispatch_id!).subscribe((dispatch) => {
      this.dispatch = dispatch;
      this.products = this.dispatch.products;
    }, this.error);
  };

  detallesProduct(product: Product) {
    this.product = product;
    this.verProduct = true;
  }

  clickAddProduct() {
    this.isEditProduct = false;
    this.verAddProduct = true;
  }

  clickEditarProduct(product: Product) {
    this.product = product;
    this.isEditProduct = true;
    this.verAddProduct = true;
  }

  clickDeleteProduct(product: Product) {
    this.datos = {
      titulo: 'Eliminar producto',
      mensaje: '¿Desea eliminar el producto de',
      extra: product.deliveryName + '?',
    };
    this.productAEliminar = product;
    this.isDeleteProduct = true;
    this.isDeleteMasivaProduct = false;
    this.isEditProduct = false;
    this.verConfirmar = true;
  }

  clickConfirmar(valor: boolean) {
    if (valor && this.isDeleteProduct) this.eliminarProduct();
    else if (valor && this.isDeleteMasivaProduct) this.eliminarProducts();
    this.verConfirmar = false;
  }

  clickDeleteMasivoProduct() {
    if (!this.selection || this.selection.length === 0) {
      this.alertService.setAlert({
        mensaje: 'Debe seleccionar al menos un producto.',
        tipo: 'error',
      });
      return;
    }
    this.datos = {
      titulo: 'Eliminar productos',
      mensaje: '¿Desea eliminar los productos marcados?',
      extra: `${this.selection.length} Producto(s)`,
    };
    this.isDeleteProduct = false;
    this.isDeleteMasivaProduct = true;
    this.isEditProduct = false;
    this.verConfirmar = true;
  }

  create(product: Product) {
    this.productsService.create(this.dispatch._id, product).subscribe(() => {
      this.success('Producto creado', 'create');
    }, this.error);
  }

  update(product: Product) {
    this.productsService
      .update(this.dispatch._id, product)
      .subscribe((message) => {
        this.success(message, 'update');
      }, this.error);
  }

  eliminarProduct() {
    this.eliminarProducts([this.productAEliminar]);
  }

  eliminarProducts(products = this.selection) {
    const _ids = products.map((product) => product._id);
    this.productsService
      .delete(_ids, this.dispatch._id)
      .subscribe((message) => {
        this.success(message, 'delete');
      }, this.error);
  }

  setExcel(event: any) {
    if (event) {
      this.file = event.target.files[0];
    } else {
      this.file = null;
      this.formFile.reset();
    }
  }

  downloadTemplate() {
    this.excelService.generate();
  }

  uploadExel() {
    if (this.file) {
      this.productsService
        .uploadExcel(this.dispatch._id, this.file)
        .subscribe(() => {
          this.success('Productos creados', 'create');
          this.setExcel(null);
        }, this.error);
    }
  }

  private success = (message: string, type: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: type });
    this.selection = [];
    this.setData(this.dispatch._id);
  };
  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
  };
}
