import { Product } from './../products.schema';
import { Types } from 'mongoose';

export const keysToEnglish = () => {
  const createProducts: Product = {
    deliveryName: '',
    deliveryCommuna: Types.ObjectId(),
    deliveryPhone: '',
    deliveryAddress: '',
    addressDetails: '',
    observations: '',
    dispatch_id: Types.ObjectId(),
  };
  const keysInEnglish = Object.keys(createProducts);
  return keysInEnglish;
};
