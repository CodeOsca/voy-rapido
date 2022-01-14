import { SECRET_KEY } from './coupons.hooks';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Coupons, CouponsDocument, CouponDto } from './coupons.schema';
import { verify } from 'jsonwebtoken';

@Injectable()
export class CouponsService {
  constructor(@InjectModel(Coupons.name) private coupons: Model<CouponsDocument>) {}

  create(coupon: Partial<Coupons>) {
    return this.coupons.create(coupon);
  }

  findAll() {
    return this.coupons.find();
  }

  findOne(field: Partial<CouponDto>) {
    return this.coupons.findOne(field);
  }

  updateOne(_id: Types.ObjectId, coupon: Partial<CouponDto>) {
    return this.coupons.updateOne({ _id }, coupon);
  }

  updateMany(_ids: Types.ObjectId[], coupon: Partial<CouponDto>) {
    return this.coupons.updateMany({ _id: { $in: _ids } }, coupon);
  }

  removeMany(_ids: Types.ObjectId[]) {
    return this.coupons.deleteMany({ _id: { $in: _ids } });
  }

  removeOne(_id: Types.ObjectId) {
    return this.coupons.deleteOne({ _id });
  }

  verify({ expirationTime }: Partial<CouponDto>) {
    verify(expirationTime, SECRET_KEY);
  }
}
