import { Types } from 'mongoose';
import { DispatchesService } from '../../dispatches/dispatches.service';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { Status } from '../../dispatches/enums/status.enum';

@ValidatorConstraint({ name: 'isValidOperation', async: true })
@Injectable()
export class IsValidOperationConstraint implements ValidatorConstraintInterface {
  constructor(private dispatchesServices: DispatchesService) {}

  async validate(_id: Types.ObjectId) {
    const dispatch = await this.dispatchesServices.findOne({ _id });
    return dispatch.status === Status.UNPAID;
  }
}
