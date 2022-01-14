import { User } from '../interfaces/user.interface';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PaymentType } from '../enums/payment-type.enum';

@Directive({
  selector: '[appPaymentType]',
})
export class PaymentTypeSubscriptionDirective {
  private currentUser: User;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentProfile.subscribe((user) => {
      this.currentUser = user;
      this.reset();
      if (!this.isValid()) this.viewContainerRef.clear();
    });
  }

  private reset() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private isValid() {
    return this.currentUser.paymentType === PaymentType.MONTHLY;
  }
}
