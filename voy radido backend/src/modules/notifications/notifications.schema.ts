import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationsDocument = Notifications & Document;

@Schema({ timestamps: true })
export class Notifications {
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  wasSeen: boolean;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
export type NotificationDto = Notifications & { _id: Types.ObjectId };
