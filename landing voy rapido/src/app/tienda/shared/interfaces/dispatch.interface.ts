import { Product } from './product.interface';
import { User } from 'src/app/tienda/shared/interfaces/user.interface';
import { Status } from '../enums/dispatch-status.enum';

export interface Dispatch {
  _id: string;
  userClient: User;
  retirementDate: Date;
  amount: number;
  products: Product[];
  code: number;
  status: Status;
  coupon?: null | { code: string; discountRate: number };
  capture?: null | string;
}
