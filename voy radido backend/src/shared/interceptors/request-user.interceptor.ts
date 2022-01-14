import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

export const REQUEST_USER = 'user';

@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  constructor(private type: 'query' | 'body' | 'param') {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (this.type && request[this.type]) {
      request[this.type][REQUEST_USER] = request.user;
    }
    return next.handle();
  }
}
