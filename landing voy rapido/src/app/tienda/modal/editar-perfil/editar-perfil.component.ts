import { CommunesService } from './../../shared/services/communes.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user.interface';
import { Commune } from '../../shared/interfaces/commune.interface';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: [
    './editar-perfil.component.scss',
    '../../../shared/scss/modal-two.scss',
    '../../../shared/scss/form.scss',
  ],
})
export class EditarPerfilComponent implements AfterContentInit, OnInit {
  form: FormGroup;
  communes: Commune[];
  selectFilter: Commune[];
  verSelect: boolean = false;
  filterSeleccionado: Commune;

  @Input() ver: boolean = false;
  @Input() user: User;
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() userReturn = new EventEmitter<User>();

  constructor(
    private fb: FormBuilder,
    private communeService: CommunesService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.communeService.getAll().subscribe((communes) => {
      this.communes = communes;
      this.selectFilter = this.communes;
    });
  }

  ngAfterContentInit(): void {
    this.form = this.fb.group({
      email: [this.user.email, [Validators.required]],
      storeName: [this.user.storeName, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      phone: [
        this.user.phone,
        [Validators.required, Validators.pattern(/^[0-9+]+$/)],
      ],
      phoneTwo: [this.user.phoneTwo, [Validators.pattern(/^[0-9+]+$/)]],
      instagram: [this.user.instagram],
      website: [this.user.website],
      commune: [this.user.commune?.name, [Validators.required]],
      storeDetails: [this.user.storeDetails],
      address: [this.user.address, [Validators.required]],
      withdrawalAddress: [this.user.withdrawalAddress, [Validators.required]],
    });
  }

  onSubmit() {
    const select = this.verificateSelect();
    if (select.length === 0 || select.length > 1) {
      this.alert.setAlert({
        mensaje: 'Selecione una opción valida.',
        tipo: 'error',
      });
      return;
    }

    this.form.valid ? this.updateUser() : this.setTouchedInputs();
  }

  setTouchedInputs() {
    const controls = this.form.controls;
    Object.values(controls).forEach((control) => control.markAsTouched());
  }

  updateUser() {
    const select = this.verificateSelect();
    const value = {
      ...this.form.value,
      commune: select[0]._id,
      _id: this.user._id,
    };
    this.userReturn.emit(value);
    this.cerrar.emit(false);
  }

  verificarInput(value: string) {
    return (
      this.form.get(value)?.invalid &&
      (this.form.get(value)?.dirty || this.form.get(value)?.touched)
    );
  }

  clickSeleccionarFilter(select: Commune) {
    this.filterSeleccionado = select;
    this.form.controls['commune'].setValue(select.name);
    this.verSelect = false;
  }

  filterSelect(event: Event) {
    this.verSelect = true;
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.selectFilter = this.communes.filter((filter) =>
      filter.name.toLowerCase().includes(filterValue)
    );
  }

  blurSeleccionarFilter() {
    this.verSelect = false;
    const select = this.verificateSelect();
    if (select.length === 1) {
      this.form.controls['commune'].setValue(select[0].name);
      this.filterSeleccionado = select[0];
    }
  }

  verificateSelect() {
    const value = this.form.value.commune
      ? this.form.value.commune.split('(')[0]
      : '';
    const filterValue = value.trim().toLowerCase();
    const select = this.communes.filter((select) =>
      select.name.toLowerCase().includes(filterValue)
    );
    return select;
  }
}
