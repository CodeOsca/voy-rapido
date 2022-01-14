import { Injectable } from '@nestjs/common';
import { CommunesService } from '../../../communes/communes.service';
import { Product } from '../../products.schema';
import { Calculator } from '../../../../shared/interface/calculator.interface';

@Injectable()
export class CommuneCalculator implements Calculator<Product> {
  constructor(private communeService: CommunesService) {}

  async calculate(product: Partial<Product>): Promise<number> {
    const commune = await this.communeService.findOne({ _id: product.deliveryCommuna });
    return commune.priceWithIVA;
  }
}
