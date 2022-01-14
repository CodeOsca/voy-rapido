import { Types } from 'mongoose';
import { Role } from 'src/core/users/enums/role.enum';

export interface CurrentUser {
  _id?: Types.ObjectId;
  role: Role;
}
