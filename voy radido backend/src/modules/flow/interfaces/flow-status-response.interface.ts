import { Optional } from './optional.interface';

export interface StatusResponse {
  flowOrder: string;
  commerceOrder: string;
  requestDate: Date;
  status: number;
  subject: string;
  currency: string;
  amount: number;
  payer: string;
  optional: Optional;
  pending_info: PendingInfo;
  paymentData: PaymentData;
  merchantId: string;
}

export interface PaymentData {
  date: Date;
  media: string;
  conversionDate: Date;
  conversionRate: number;
  amount: number;
  currency: string;
  fee: number;
  balance: number;
  transferDate: Date;
}

export interface PendingInfo {
  media: string;
  date: Date;
}
