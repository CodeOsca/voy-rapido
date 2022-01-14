import { Days } from './../../communes/enums/days.enum';
import { DateCommune } from '../../communes/services/date.service';
import { Types } from 'mongoose';
import { UsersService } from 'src/core/users/users.service';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { REQUEST_USER } from 'src/shared/interceptors/request-user.interceptor';
import { ExtendedValidationArguments } from 'src/shared/interface/validation-arguments.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsDayAvailableConstraint implements ValidatorConstraintInterface {
  private retirementDays: Days[];
  constructor(private usersService: UsersService) {}

  async validate(_, args: ExtendedValidationArguments) {
    const userID = args?.object[REQUEST_USER]._id;
    const user = await this.usersService.findOne({ _id: Types.ObjectId(userID) }).populate('commune');
    this.retirementDays = user.commune['retirementDates'];
    const availableDays = DateCommune.getDayAvailble(this.retirementDays);
    return DateCommune.includeDay(DateCommune.day, availableDays);
  }

  defaultMessage() {
    return 'La comuna de retiro solo esta disponible (' + String(this.retirementDays).toLocaleLowerCase() + ').';
  }
}
