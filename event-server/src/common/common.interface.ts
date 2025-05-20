import { Types } from 'mongoose';
import { RoleType } from 'src/common/role.enum';

export interface IUser {
  _id: Types.ObjectId;
  id: string;
  password: string;
  roles: RoleType[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
