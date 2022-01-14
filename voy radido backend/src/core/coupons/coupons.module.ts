import { IsValidInterceptor } from './interceptors/is-valid.interceptor';
import { IsValidCouponConstraint } from './validators/isValid.validator';
import { Coupons, CouponsSchema } from './coupons.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsService } from './coupons.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coupons.name, schema: CouponsSchema }]),
  ],
  controllers: [CouponsController],
  providers: [CouponsService, IsValidCouponConstraint, IsValidInterceptor],
  exports: [CouponsService],
})
export class CouponsModule {}
