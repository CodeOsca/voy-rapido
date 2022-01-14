import { Product } from './../../shared/interfaces/product.interface';
import { Commune } from './../../shared/interfaces/commune.interface';
import { CommunesService } from './../../shared/services/communes.service';
import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss', '../../../shared/scss/modal.scss', '../../../shared/scss/form.scss'],
})
export class AddProductComponent implements OnChanges, OnInit {
  form: FormGroup;
  communes: Commune[] = [];
  selectFilter: Commune[];
  verSelect: boolean = false;
  filterSeleccionado: Commune | null = null;
  title: string;
  titleButton: string;

  @Input() product: Product;
  @Input() ver: boolean = true;
  @Input() isAdd: boolean = true;
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() create = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();

  constructor(private fb: FormBuilder, private alertService: AlertService, private communesService: CommunesService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      deliveryCommuna: ['', [Validators.required]],
      deliveryName: ['', [Validators.required]],
      deliveryAddress: ['', [Validators.required]],
      addressDetails: ['', [Validators.required]],
      deliveryPhone: ['', [Validators.required]],
      observations: ['', [Validators.required]],
    });
    this.communesService.getAll().subscribe((communes) => {
      this.communes = communes;
      this.selectFilter = this.communes;
    });
  }

  ngOnChanges() {
    this.title = !this.isAdd ? 'Editar producto' : 'Agregar producto';
    this.titleButton = this.title;
    this.filterSeleccionado = null;
    !this.isAdd
      ? this.form.patchValue({
          deliveryCommuna: this.product.deliveryCommuna.name,
          deliveryName: this.product.deliveryName,
          deliveryAddress: this.product.deliveryAddress,
          deliveryPhone: this.product.deliveryPhone,
          addressDetails: this.product.addressDetails,
          observations: this.product.observations,
        })
      : this.form?.reset();
  }

  onSubmit() {
    if (this.form.valid && this.validateCommune()) {
      const product = this.form.value;
      if (this.filterSeleccionado) product.deliveryCommuna = this.filterSeleccionado._id;
      else product.deliveryCommuna = this.product.deliveryCommuna._id;

      if (this.isAdd) {
        this.create.emit(product);
      } else {
        product._id = this.product._id;
        this.update.emit(product);
      }
      this.cerrar.emit(false);
    }
  }

  clickSeleccionarFilter(select: Commune) {
    this.filterSeleccionado = select;
    this.form.controls['deliveryCommuna'].setValue(select.name);
    this.verSelect = false;
  }

  filterSelect(event: Event) {
    this.verSelect = true;
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.selectFilter = this.communes.filter((filter) => filter.name.toLowerCase().includes(filterValue));
  }

  blurSeleccionarFilter() {
    this.verSelect = false;
    const select = this.verificateSelect();
    if (select.length === 1) {
      this.form.controls['deliveryCommuna'].setValue(select[0].name);
      this.filterSeleccionado = select[0];
    }
  }

  verificateSelect() {
    const value = this.form.value.deliveryCommuna ? this.form.value.deliveryCommuna.split('(')[0] : '';
    const filterValue = value.trim().toLowerCase();
    const select = this.communes.find((select) => select.name.toLowerCase().includes(filterValue));
    return select ? [select] : [];
  }

  validateCommune() {
    const select = this.verificateSelect();
    if (select.length === 0 || select.length > 1) {
      this.alertService.setAlert({
        mensaje: 'Selecione una comuna valida.',
        tipo: 'error',
      });
      return;
    }

    return true;
  }

  verificarInput(value: string) {
    return this.form.get(value)?.invalid && (this.form.get(value)?.dirty || this.form.get(value)?.touched);
  }
}
