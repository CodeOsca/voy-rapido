import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PhotoDocument = Photo & Document;

@Schema({ timestamps: true })
export class Photo {
  @Prop({ required: true })
  name: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
export type PhotoDto = Photo & { _id: Types.ObjectId };
