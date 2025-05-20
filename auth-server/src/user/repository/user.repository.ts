import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../model/user.model';
import { CreateUserReqDto } from '../dto/user-req.dto';
import { IUpdateUserRole } from '../interface/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async getUserByIndex(_id: Types.ObjectId): Promise<User | null> {
    return await this.userModel.findById(_id).lean();
  }

  async createUser(data: CreateUserReqDto) {
    return await this.userModel.create(data);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findOne({ id }).lean();
  }

  async updateUserRole(data: IUpdateUserRole) {
    const { userId, roles } = data;
    return await this.userModel.updateOne({ _id: userId }, { roles });
  }
}
