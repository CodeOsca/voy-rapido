import { TypeReference } from './enums/type-reference.enum';
import { PaymentMedia } from './enums/media-payment.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrdersDocument = Orders & Document;

@Schema({ timestamps: true })
export class Orders {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  reference: Types.ObjectId;

  @Prop({ required: true, enum: TypeReference })
  typeReference: TypeReference;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop({ required: true })
  payer: string;

  @Prop({ required: true, enum: PaymentMedia })
  media: PaymentMedia;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
export type OrderDto = Orders & { _id: Types.ObjectId; createdAt: any };
