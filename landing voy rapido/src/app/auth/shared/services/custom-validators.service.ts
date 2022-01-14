import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor() {}
  repeatPassword(control: FormGroup): { [key: string]: boolean } | null {
    const { repeatPassword, password } = control.controls;
    const isMatched = password.value === repeatPassword.value;
    return isMatched ? null : { repeatPassword: true };
  }
}
