import { PriceCalculator } from './models/price-calculator.model';
import { Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunesService } from '../communes/communes.service';
import { CreateDto } from './dto/create.dto';
import { Product } from './products.schema';
import { validator } from './validators/create-products.validator';

@Injectable()
export class BuildService {
  constructor(private communesService: CommunesService, private priceCalculator: PriceCalculator) {}

  async build(products: Product[], dispatchID: Types.ObjectId, userID: Types.ObjectId) {
    const _products: Product[] = [];

    for (let i = 0; i < products.length; i++) {
      const communeName = <string>(<unknown>products[i].deliveryCommuna);
      const commune = await this.communesService.findOne({ name: communeName.toLowerCase() });
      if (!commune) throw new NotFoundException('La comuna ' + communeName + ' no existe.');
      const createDto = new CreateDto();
      Object.assign(createDto, products[i]);
      createDto.deliveryCommuna = commune._id;
      createDto.deliveryPhone = String(products[i].deliveryPhone);
      createDto.dispatch_id = dispatchID;
      createDto.user = userID;
      await validator(createDto);
      createDto['price'] = await this.priceCalculator.calculate(createDto);
      _products.push(createDto);
    }

    return _products;
  }
}
