import { applyDecorators, UseInterceptors, UsePipes } from '@nestjs/common';
import { InjectUserInterceptor } from '../interceptors/request-user.interceptor';
import { StripRequestUserPipe } from '../pipes/stripRequestUserPipe.pipe';

export function InjectUserToQuery() {
  return applyDecorators(InjectUserTo('query'));
}

export function InjectUserToBody() {
  return applyDecorators(InjectUserTo('body'));
}

export function InjectUserToParam() {
  return applyDecorators(InjectUserTo('param'));
}

function InjectUserTo(context: 'query' | 'body' | 'param') {
  return applyDecorators(
    UseInterceptors(new InjectUserInterceptor(context)),
    UsePipes(new StripRequestUserPipe()),
  );
}
