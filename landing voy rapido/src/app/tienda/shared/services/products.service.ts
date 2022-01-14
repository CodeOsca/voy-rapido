import { pluck } from 'rxjs/operators';
import { Dispatch } from './../interfaces/dispatch.interface';
import { Product } from './../interfaces/product.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API = environment.API + 'products/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  create(dispatch_id: string, product: Product) {
    return this.http.post<Dispatch>(this.API + 'create', {
      ...product,
      dispatch_id,
    });
  }

  update(dispatch_id: string, product: Product): Observable<string> {
    return this.http
      .put(this.API, { ...product, dispatch_id })
      .pipe(pluck('message'));
  }

  delete(_ids: string[], dispatch_id: string): Observable<string> {
    this.httpOptions['body'] = { _ids, dispatch_id };
    return this.http.delete(this.API, this.httpOptions).pipe(pluck('message'));
  }

  uploadExcel(dispatch_id: string, excel: File) {
    const fileData = new FormData();
    fileData.append('file', excel);
    return this.http.post(this.API + 'upload/' + dispatch_id, fileData);
  }
}
