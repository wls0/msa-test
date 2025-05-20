import { ObjectId, Types } from 'mongoose';
import { RoleType } from '../role/role.enum';

export interface IUser {
  _id: Types.ObjectId;
  id: string;
  password: string;
  roles: RoleType[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
