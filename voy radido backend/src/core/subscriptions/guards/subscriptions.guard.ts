import { PaymentType } from './../../users/enums/payment-type.enum';
import { UsersService } from './../../users/users.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.usersService.findOne({ _id: req.user._id });

    if (user) {
      const paymentTypes = Object.values(PaymentType);
      this.removePaymentDaily(paymentTypes);
      const isAllow = paymentTypes.includes(user.paymentType);
      if (!isAllow) throw new UnauthorizedException('No autorizado');
    } else {
      throw new NotFoundException('El usuario no existe');
    }

    return true;
  }

  private removePaymentDaily(subscriptions: PaymentType[]) {
    const predicate = (subscription) => subscription === PaymentType.DAILY;
    const index = subscriptions.findIndex(predicate);
    subscriptions.splice(index, 1);
  }
}
