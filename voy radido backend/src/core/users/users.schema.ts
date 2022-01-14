import { Role } from './enums/role.enum';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentType } from './enums/payment-type.enum';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  storeName: string;

  @Prop()
  storeDetails: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop()
  withdrawalAddress: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  phoneTwo: string;

  @Prop()
  instagram: string;

  @Prop()
  website: string;

  @ExcludeProperty()
  @Prop({ required: true, minlength: 8 })
  password: string;

  @Prop()
  address: string;

  @Prop({ type: Types.ObjectId, ref: 'Commune' })
  commune: Types.ObjectId;

  @Prop({ enum: Role, default: Role.CUSTOMER })
  role: Role;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: 'default.png' })
  image: string;

  @Prop({ default: PaymentType.DAILY, enum: PaymentType })
  paymentType: PaymentType;

  @Prop(
    raw({
      rating: { type: Number, min: 0, max: 5 },
      description: { type: String },
      visible: { type: Boolean },
    }),
  )
  comment: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDto = User & {
  _id: Types.ObjectId;
  'comment.visible': boolean;
};
import './users.hooks';
