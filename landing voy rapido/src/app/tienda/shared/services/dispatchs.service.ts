import { pluck } from 'rxjs/operators';
import { Dispatch } from './../interfaces/dispatch.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DispatchsService {
  private API = environment.API + 'dispatches/';
  constructor(private http: HttpClient) {}

  getOne(_id: string) {
    return this.http.get<Dispatch>(this.API + _id);
  }

  getAll() {
    return this.http.get<Dispatch[]>(this.API + 'current-user');
  }

  getAllActive() {
    return this.http.get<Dispatch[]>(this.API + 'current-user/all-active');
  }

  getAllRevision() {
    return this.http.get<Dispatch[]>(this.API + 'current-user/revision');
  }

  getAllNotPayedOrSubscribed() {
    return this.http.get<Dispatch[]>(this.API + 'current-user/not-payed-or-subscribed');
  }

  create() {
    return this.http.post<Dispatch>(this.API, {});
  }

  delete(dispatch: Dispatch) {
    return this.http.delete(this.API + dispatch._id);
  }

  changeToRevision(dispatch: Dispatch, file: File, coupon: string): Observable<string> {
    const fileData = new FormData();
    fileData.append('file', file);
    fileData.append('_id', dispatch._id);
    fileData.append('coupon', coupon);
    return this.http.post(this.API + 'change-to-revision', fileData).pipe(pluck('message'));
  }
}
