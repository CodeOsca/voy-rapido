import { CouponsDocument, CouponsSchema } from './coupons.schema';
import { CouponGenerator } from './models/coupon-generator.model';
import { sign } from 'jsonwebtoken';
export const SECRET_KEY = 'COUPON_TOKEN';

CouponsSchema.pre<CouponsDocument>('validate', async function (next) {
  this.code = new CouponGenerator(this.name).generate();
  this.expirationTime = getToken(this.expirationTime);
  next();
});

CouponsSchema.pre<CouponsDocument>('updateOne', async function (next) {
  const data = this['getUpdate']();
  if (data.expirationTime) {
    data.expirationTime = getToken(data.expirationTime);
  }
  next();
});

function getToken(expirationTime: string) {
  return sign({}, SECRET_KEY, { expiresIn: expirationTime });
}
