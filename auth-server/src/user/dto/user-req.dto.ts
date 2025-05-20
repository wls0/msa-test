import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { MongoId } from '../../common/decorators/mongo-objectid.decorator';
import { RoleType } from '../enum/role.enum';

export class CreateUserReqDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RoleType, {
    each: true,
  })
  roles: RoleType[];
}

export class UpdateUserRoleReqDto {
  @IsNotEmpty()
  @MongoId()
  userId: Types.ObjectId;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(RoleType, {
    each: true,
  })
  roles: RoleType[];
}
