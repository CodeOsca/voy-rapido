import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Status } from './enums/status.enum';

export type DispatchesDocument = Dispatch & Document;

@Schema({ timestamps: true })
export class Dispatch {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  retirementDate: string;

  @Prop()
  capture?: string;

  @Prop({ type: raw({ code: { type: String }, discountRate: { type: Number } }) })
  coupon?: { code: string; discountRate: number };

  @Prop({ default: 0 })
  amount: number;

  @Prop({ enum: Status, default: Status.UNPAID })
  status: Status;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Types.ObjectId[];
}

export const DispatchesSchema = SchemaFactory.createForClass(Dispatch);
export type DispatchDto = Dispatch & { _id: Types.ObjectId };
