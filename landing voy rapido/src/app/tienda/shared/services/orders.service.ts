import { Order } from './../interfaces/order.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private API = environment.API + 'orders/';
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>(this.API + 'current-user');
  }

  getOne(_id: string) {
    return this.http.get<Order>(this.API + _id);
  }
}
