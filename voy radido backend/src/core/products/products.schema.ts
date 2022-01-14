import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductsDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'Commune', required: true })
  deliveryCommuna: Types.ObjectId;

  @Prop({ required: true })
  deliveryName: string;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  addressDetails: string;

  @Prop({ required: true })
  deliveryPhone: string;

  @Prop({ required: true })
  price?: number;

  @Prop({ required: true })
  observations: string;

  @Prop({ type: Types.ObjectId, ref: 'Dispatch', required: true })
  dispatch_id: Types.ObjectId;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
export type ProductDto = Product & { _id: Types.ObjectId };
