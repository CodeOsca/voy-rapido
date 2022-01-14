import { PaymentMedia } from '../enums/media-payment.enum';
import { TypeReference } from '../enums/type-reference.enum';

export interface Order {
  reference: string;
  typeReference: TypeReference;
  amount: number;
  paymentDate: Date | string;
  media: PaymentMedia;
}
