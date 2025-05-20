import { Types } from 'mongoose';
import { RoleType } from 'src/user/enum/role.enum';

export interface IUser {
  _id: Types.ObjectId;
  id: string;
  password: string;
  roles: RoleType[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUpdateUserRole {
  userId: Types.ObjectId;
  roles: RoleType[];
}
