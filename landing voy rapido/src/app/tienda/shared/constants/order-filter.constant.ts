import { PaymentMedia } from '../enums/media-payment.enum';
import { TypeReference } from '../enums/type-reference.enum';

export const filterOptions = [
  PaymentMedia.FLOW,
  PaymentMedia.TRANSFER,
  TypeReference.DISPATCH,
  TypeReference.SUBSCRIPTION,
];
