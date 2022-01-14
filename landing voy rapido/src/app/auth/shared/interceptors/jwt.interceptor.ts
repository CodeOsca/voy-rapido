import { StorageTokenService } from './../services/storage-token.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private storageToken: StorageTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageToken.get();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: 'bearer ' + token,
        },
      });
    }
    return next.handle(req);
  }
}

export const HTTP_JWT_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
