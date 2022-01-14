import * as code from 'voucher-code-generator';
export class CouponGenerator {
  private prefix = 'voyrapido-';
  constructor(private name) {}

  generate(): string {
    const configCoupon = { length: 5, prefix: this.prefix + this.name + '-' };
    return code.generate(configCoupon)[0];
  }
}
