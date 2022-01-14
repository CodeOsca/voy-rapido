import { Commune } from './commune.interface';

export interface Product {
  _id: string;
  deliveryCommuna: Commune;
  deliveryName: string;
  deliveryAddress: string;
  deliveryPhone: string;
  addressDetails: string;
  price: number;
  observations: string;
}
