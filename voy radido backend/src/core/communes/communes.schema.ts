import { Days } from './enums/days.enum';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommuneDocument = Commune & Document;

@Schema({ timestamps: true })
export class Commune {
  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({
    required: true,
    type: raw({
      latitude: { type: String },
      longitude: { type: String },
    }),
  })
  coordinates: { latitude: string; longitude: string };

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  priceWithIVA: number;

  @Prop({ type: Array, required: true, enum: Days })
  retirementDates: Days[];

  @Prop({ default: true })
  status: boolean;
}

export const CommuneSchema = SchemaFactory.createForClass(Commune);
export type CommuneDto = Commune & { _id: Types.ObjectId };
import './communes.hooks';
