import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Status } from 'src/core/dispatches/enums/status.enum';
import { DispatchesService } from '../dispatches.service';

@ValidatorConstraint({ name: 'paidOut', async: true })
@Injectable()
export class PaidOutDispatchesConstraint
  implements ValidatorConstraintInterface {
  constructor(private dispatchesService: DispatchesService) {}

  async validate(value: Types.ObjectId, args: ValidationArguments) {
    const { status } = await this.dispatchesService.findOne({ _id: value });
    return status === Status.PAID;
  }
}
