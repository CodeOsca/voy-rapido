import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private API = environment.API + 'photos';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ name: string }[]>(this.API);
  }
}
