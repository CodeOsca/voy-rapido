import { Product } from './../products.schema';
import { validateOrReject, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export const validator = async (product: Product) => {
  try {
    const options = { stopAtFirstError: true, whitelist: true };
    await validateOrReject(product, options);
  } catch (error) {
    console.log(error);
    error = error[0];
    const { constraints } = error as ValidationError;
    const firstError = Object.keys(constraints)[0];
    const message = constraints[firstError];
    throw new BadRequestException(message);
  }
};
