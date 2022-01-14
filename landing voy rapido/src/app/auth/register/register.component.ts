import { Router } from '@angular/router';
import { CustomValidatorsService } from './../shared/services/custom-validators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../shared/scss/auth.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  typeInput = 'password';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private customValidatorsService: CustomValidatorsService,
    private router: Router
  ) {}

  get isTypePassword() {
    return this.typeInput === 'password';
  }

  toggleType() {
    const type = this.isTypePassword ? 'text' : 'password';
    this.typeInput = type;
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group(
      {
        name: ['', [Validators.required]],
        storeName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9+]+$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [this.customValidatorsService.repeatPassword] }
    );
  }

  onSubmit() {
    if (this.formRegister.valid) {
      this.isLoading = true;
      const { value } = this.formRegister;
      this.authService
        .register(value)
        .subscribe(this.success, this.error, () => (this.isLoading = false));
    }
  }

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
    setTimeout(() => this.router.navigate(['']), 2000);
  };
  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
    this.isLoading = false;
  };

  verificarInput(value: string) {
    return (
      this.formRegister.get(value)?.invalid &&
      (this.formRegister.get(value)?.dirty ||
        this.formRegister.get(value)?.touched)
    );
  }
}
