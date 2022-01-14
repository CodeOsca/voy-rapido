import { Types } from 'mongoose';
export interface Optional {
  _id: Types.ObjectId;
  coupon: null | string;
}
