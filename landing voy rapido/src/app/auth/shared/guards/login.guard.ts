import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    const isLoggin = this.authService.isLogginValue;
    if (isLoggin) {
      this.router.navigate(['tienda']);
      return false;
    }
    return true;
  }
}
