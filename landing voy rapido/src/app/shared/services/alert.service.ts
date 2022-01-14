import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert = new Subject();
  getAlert = this.alert.asObservable();

  setAlert(data: any) {
    this.alert.next(data);
  }
}
