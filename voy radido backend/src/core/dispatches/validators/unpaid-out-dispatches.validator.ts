import { Types } from 'mongoose';
import { DispatchesService } from '../dispatches.service';
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Status } from 'src/core/dispatches/enums/status.enum';

@ValidatorConstraint({ name: 'unpaidOut', async: true })
@Injectable()
export class UnpaidOutDispatchesConstraint
  implements ValidatorConstraintInterface {
  constructor(private dispatchesService: DispatchesService) {}

  async validate(value: Types.ObjectId, args: ValidationArguments) {
    const { status } = await this.dispatchesService.findOne({ _id: value });
    return status === Status.UNPAID;
  }
}
