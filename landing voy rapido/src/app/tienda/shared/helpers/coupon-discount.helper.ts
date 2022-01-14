export class CouponCalculate {
  constructor(private amount: number, private discountRate: number) {}

  calculate() {
    const discount = (this.discountRate * this.amount) / 100;
    return Math.round(this.amount - discount);
  }
}
