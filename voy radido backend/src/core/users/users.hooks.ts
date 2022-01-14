import { compare, genSalt, hash } from 'bcryptjs';
import { UserDocument, UserSchema } from './users.schema';

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }
  next();
});

UserSchema.pre<UserDocument>('updateOne', async function (next) {
  const data = this['getUpdate']();
  if (data.password) {
    const salt = await genSalt();
    data.password = await hash(data.password, salt);
  }
  next();
});

UserSchema.methods.verifyPassword = function (password: string) {
  return compare(password, this['password']);
};
