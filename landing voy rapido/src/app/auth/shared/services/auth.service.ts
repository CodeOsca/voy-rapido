import { ResponseOk } from './../interfaces/server-response.interface';
import { UserRegister } from './../interfaces/auth.interface';
import { StorageTokenService } from './storage-token.service';
import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { UserLogin } from '../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from 'src/app/tienda/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggin$: BehaviorSubject<boolean>;
  private currentProfile$: ReplaySubject<User> = new ReplaySubject();
  private endpoint = environment.API + 'auth';

  constructor(
    private http: HttpClient,
    private storageToken: StorageTokenService
  ) {
    let initialState = storageToken.has();

    if (initialState) {
      this.updateProfile();
    }
    this.isLoggin$ = new BehaviorSubject(initialState);
  }

  get isLoggin(): Observable<boolean> {
    return this.isLoggin$.asObservable();
  }

  get isLogginValue(): boolean {
    return this.isLoggin$.value;
  }

  get currentProfile() {
    return this.currentProfile$.asObservable();
  }

  async updateProfile() {
    this.http.get<User>(this.endpoint + '/profile').subscribe((user) => {
      this.currentProfile$.next(user);
      this.isLoggin$.next(true);
    });
  }

  login(user: UserLogin) {
    return this.http
      .post<ResponseOk & { token: string }>(this.endpoint + '/login', user)
      .pipe(
        tap(({ token }) => {
          this.storageToken.set(token);
          location.reload();
        }),
        pluck('message')
      );
  }

  register(user: UserRegister) {
    return this.http
      .post<ResponseOk>(this.endpoint + '/register', user)
      .pipe(pluck('message'));
  }

  logOut(): void {
    this.storageToken.remove();
    location.reload();
  }

  newPassword(password: string, token: string) {
    return this.http
      .post<ResponseOk>(this.endpoint + '/new-password/' + token, {
        password,
      })
      .pipe(pluck('message'));
  }

  recoverPassword(email: string) {
    return this.http
      .post<ResponseOk>(this.endpoint + '/forgot-password', {
        email,
      })
      .pipe(pluck('message'));
  }
}
