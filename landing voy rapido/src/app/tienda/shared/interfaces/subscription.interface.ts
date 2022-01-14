import { Status } from '../enums/dispatch-status.enum';
import { Dispatch } from './dispatch.interface';

export interface Subscription {
  _id: string;
  dispatches: Dispatch[];
  status: Status;
  canPay: boolean;
  amount: number;
  dateToPayment: string;
  coupon?: null | { code: string; discountRate: number };
  capture?: null | string;
}
