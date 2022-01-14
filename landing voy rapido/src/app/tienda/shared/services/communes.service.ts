import { Commune } from '../interfaces/commune.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunesService {
  private API = environment.API + 'communes/';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Commune[]>(this.API + 'active');
  }
}
