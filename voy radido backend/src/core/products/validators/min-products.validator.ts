import { Types } from 'mongoose';
import { DispatchesService } from '../../dispatches/dispatches.service';
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'minProduct', async: true })
@Injectable()
export class MinProductsConstraint implements ValidatorConstraintInterface {
  constructor(private dispatchesService: DispatchesService) {}

  async validate(value: Types.ObjectId, args: ValidationArguments) {
    const MinLength = 3;
    const { products } = await this.dispatchesService.findOne({ _id: value });
    return products.length >= MinLength;
  }

  defaultMessage() {
    return 'Debe tener al menos 3 productos';
  }
}
