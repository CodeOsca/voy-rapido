import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserDto } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  findAll(field: Partial<UserDto> = {}) {
    return this.user.find(field);
  }

  findByArray(usersID: Types.ObjectId[]) {
    return this.user.find({ _id: { $in: usersID } });
  }

  create(user: Partial<User>) {
    return this.user.create(user);
  }

  findOne(field: Partial<UserDto>) {
    return this.user.findOne(field);
  }

  updateOne(_id: Types.ObjectId, updateUserDto: Partial<UserDto>) {
    return this.user.updateOne({ _id }, updateUserDto);
  }

  updateMany(_ids: Types.ObjectId[], updateUserDto: Partial<UserDto>) {
    return this.user.updateMany({ _id: { $in: _ids } }, updateUserDto);
  }

  removeOne(_id: Types.ObjectId) {
    return this.user.deleteOne({ _id });
  }
}
