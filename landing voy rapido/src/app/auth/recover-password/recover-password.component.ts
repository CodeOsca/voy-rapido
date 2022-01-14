import { Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { AuthService } from './../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss', '../shared/scss/auth.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  formRecover: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formRecover = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    if (this.formRecover.valid) {
      const { value } = this.formRecover;
      const { email } = value;
      this.authService
        .recoverPassword(email)
        .subscribe(this.success, this.error);
    }
  }

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'success' });
    this.isLoading = false;
    this.router.navigate(['login']);
  };
  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
    this.isLoading = false;
  };

  verificarInput(value: string) {
    return (
      this.formRecover.get(value)?.invalid &&
      (this.formRecover.get(value)?.dirty ||
        this.formRecover.get(value)?.touched)
    );
  }
}
