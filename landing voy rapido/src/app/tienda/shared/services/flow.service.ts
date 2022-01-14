import { Dispatch } from './../interfaces/dispatch.interface';
import { ResponseOk } from './../../../auth/shared/interfaces/server-response.interface';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Subscription } from '../interfaces/subscription.interface';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  private API = environment.API + 'flow/';

  constructor(private http: HttpClient) {}

  payment(dispatch: Dispatch, coupon: string | null) {
    return this.http
      .post<ResponseOk>(this.API, { dispatch: dispatch._id, coupon })
      .pipe(
        tap(({ message }) => {
          window.open(message, '_self');
        })
      );
  }

  paymentSubscription(subscription: Subscription, coupon: string | null) {
    return this.http
      .post<ResponseOk>(this.API + 'subscription', {
        _id: subscription._id,
        coupon,
      })
      .pipe(
        tap(({ message }) => {
          window.open(message, '_self');
        })
      );
  }
}
