import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { StorageTokenService } from 'src/app/auth/shared/services/storage-token.service';

@Injectable({ providedIn: 'root' })
export class SocketService extends Socket {
  constructor(private storageToken: StorageTokenService) {
    super({
      url: environment.BACKEND_BASE_URL,
      options: {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: 'Bearer ' + storageToken.get(),
            },
          },
        },
      },
    });
  }
}
