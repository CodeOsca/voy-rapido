import { PipeTransform } from '@nestjs/common';
import { REQUEST_USER } from '../interceptors/request-user.interceptor';

export class StripRequestUserPipe implements PipeTransform {
  transform(value: any) {
    delete value[REQUEST_USER];
    return value;
  }
}
