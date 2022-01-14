import { User } from './../../tienda/shared/interfaces/user.interface';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private API = environment.API + 'comments/';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.API + 'visibles');
  }
}
