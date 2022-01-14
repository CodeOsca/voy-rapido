import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'previousDate', async: true })
@Injectable()
export class IsPreviousDateRescheduleConstraint implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: Date, args: ValidationArguments) {
    const currentDate = new Date();
    const retirementDate = new Date(value);
    currentDate.setHours(0, 0, 0, 0);
    return retirementDate.getTime() >= currentDate.getTime();
  }
}
