import { ValidationArguments } from 'class-validator';
import { REQUEST_USER } from '../interceptors/request-user.interceptor';

export interface ExtendedValidationArguments extends ValidationArguments {
  object: {
    [REQUEST_USER]: { _id: string };
  };
}
