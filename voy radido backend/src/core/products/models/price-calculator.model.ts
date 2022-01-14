import { Calculator } from '../../../shared/interface/calculator.interface';
import { CommuneCalculator } from './calculators/commune-calculator.model';
import { Product } from './../products.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceCalculator implements Calculator<Product> {
  constructor(private communeCalculator: CommuneCalculator) {}

  async calculate(product: Partial<Product>): Promise<number> {
    let total = 0;
    total += await this.communeCalculator.calculate(product);
    return total;
  }
}
