import { DateString } from 'src/shared/services/date/date-string.service';
import { ExtendedValidationArguments } from '../../../shared/interface/validation-arguments.interface';
import { Connection } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Status } from '../enums/status.enum';
import { InjectConnection } from '@nestjs/mongoose';
import { REQUEST_USER } from 'src/shared/interceptors/request-user.interceptor';

@ValidatorConstraint({ name: 'haveNoDebt', async: true })
@Injectable()
export class HaveNoDebtConstraint implements ValidatorConstraintInterface {
  private MAX_DAY = 20;
  constructor(@InjectConnection() private connection: Connection) {}

  async validate(_: any, args: ExtendedValidationArguments) {
    const userID = args?.object[REQUEST_USER]._id;
    const subscription = await this.connection
      .collection('subscriptions')
      .findOne({ canPay: true, user: userID, $or: [{ status: Status.UNPAID }, { status: Status.REVISION }] });

    if (!subscription) {
      return true;
    }

    if (subscription.status === Status.REVISION) {
      throw new BadRequestException('Tienes un pago en proceso de revisión');
    }

    if (new DateString().lengthWith(subscription.dateToPayment) * -1 >= this.MAX_DAY) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Para poder seguir agendado recuerda regularizar tus pagos pendientes.';
  }
}
