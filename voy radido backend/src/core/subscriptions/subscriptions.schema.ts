import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from './enums/status.enum';

export type SubscriptionsDocument = Subscriptions & Document;

@Schema({ timestamps: true })
export class Subscriptions {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Dispatch', required: true }] })
  dispatches: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ enum: Status, default: Status.UNPAID })
  status?: Status;

  @Prop({ default: false })
  canPay: boolean;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  dateToPayment: string;

  @Prop({ type: raw({ code: { type: String }, discountRate: { type: Number } }) })
  coupon?: { code: string; discountRate: number };

  @Prop()
  capture?: string;
}

export const SubscriptionsSchema = SchemaFactory.createForClass(Subscriptions);
export type SubscriptionsDto = Subscriptions & { _id: Types.ObjectId };
