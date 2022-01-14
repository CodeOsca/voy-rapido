import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CouponsDocument = Coupons & Document;

@Schema({ timestamps: true })
export class Coupons {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  discountRate: number;

  @Prop()
  expirationTime: string;

  @Prop({ default: true })
  status: boolean;

  @Prop()
  isValid: boolean;
}

export const CouponsSchema = SchemaFactory.createForClass(Coupons);
export type CouponDto = Coupons & { _id: Types.ObjectId };
import './coupons.hooks';
