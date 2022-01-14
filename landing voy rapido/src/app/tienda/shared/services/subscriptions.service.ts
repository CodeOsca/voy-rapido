import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Dispatch } from '../interfaces/dispatch.interface';
import { Subscription } from '../interfaces/subscription.interface';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private API = environment.API + 'subscriptions/';

  constructor(private http: HttpClient) {}

  getOne(_id: string) {
    return this.http.get<Subscription>(this.API + _id);
  }

  get current() {
    return this.http.get<Subscription>(this.API + 'current-user/not-payed');
  }

  isRevision() {
    return this.http
      .get<boolean>(this.API + 'current-user/revision')
      .pipe(map((subscription) => (!!subscription ? true : false)));
  }

  getAllRevision() {
    return this.http.get<Subscription[]>(this.API + 'current-user/revision');
  }

  set(dispatch: Dispatch) {
    return this.http.post(this.API, { dispatch: dispatch._id });
  }

  changeToRevision(subscription: Subscription, file: File, coupon: string): Observable<string> {
    const fileData = new FormData();
    fileData.append('file', file);
    fileData.append('_id', subscription._id);
    fileData.append('coupon', coupon);
    return this.http.post(this.API + 'change-to-revision', fileData).pipe(pluck('message'));
  }
}
