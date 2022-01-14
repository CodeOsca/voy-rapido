import { Status } from './../enums/status.enum';
import { Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { DispatchesService } from '../dispatches.service';

@ValidatorConstraint({ name: 'canRemove', async: true })
@Injectable()
export class CanRemoveConstraint implements ValidatorConstraintInterface {
  constructor(private dispatchesService: DispatchesService) {}

  async validate(value: Types.ObjectId, args: ValidationArguments) {
    const dispatch = await this.dispatchesService.findOne({ _id: value });

    if (dispatch.status === Status.REVISION) {
      throw new BadRequestException('No puedes eliminar un retiro que esta en proceso de revisión');
    }
    if (dispatch.status === Status.SUBSCRIPTION) {
      throw new BadRequestException('No puedes eliminar un retiro que ya ha sido procesado');
    }
    if (dispatch.status === Status.PAID) {
      throw new BadRequestException('No puedes eliminar un retiro que ya ha sido pagado');
    }

    return true;
  }
}
