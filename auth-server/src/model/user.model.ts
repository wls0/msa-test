import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoleType } from '../user/enum/role.enum';
import { IUser } from '../user/interface/user.interface';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'user',
  versionKey: false,
};

@Schema(options)
export class User implements IUser {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: [String],
    required: true,
    enum: Object.values(RoleType),
  })
  roles: RoleType[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt: Date | null;
}
export type UserDocumentType = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
