import { CustomValidatorsService } from './../shared/services/custom-validators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss', '../shared/scss/auth.scss'],
})
export class ModifyPasswordComponent implements OnInit {
  formModify: FormGroup;
  token: string;
  typeInput = 'password';
  isLoading: boolean = false;

  get isTypePassword() {
    return this.typeInput === 'password';
  }

  toggleType() {
    const type = this.isTypePassword ? 'text' : 'password';
    this.typeInput = type;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private customValidatorsService: CustomValidatorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;
    this.formModify = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: [this.customValidatorsService.repeatPassword] }
    );
  }

  onSubmit() {
    if (this.formModify.valid) {
      const { value } = this.formModify;
      const { password } = value;
      this.authService
        .newPassword(password, this.token)
        .subscribe(this.success, this.error);
    }
  }

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
    this.router.navigate(['login']);
  };
  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
    this.isLoading = false;
  };

  verificarInput(value: string) {
    return (
      this.formModify.get(value)?.invalid &&
      (this.formModify.get(value)?.dirty || this.formModify.get(value)?.touched)
    );
  }
}
