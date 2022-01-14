import { CurrentUser } from './../../../core/auth/interfaces/current-user.interface';
import { Socket } from 'socket.io';
export interface SocketJWT extends Socket {
  decoded_token: CurrentUser;
}
