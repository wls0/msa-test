import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocumentType } from '../../model/user.model';

@Injectable()
export class JwtService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocumentType>) {}

  /**
   * 유저 조회
   * @param userId
   * @returns
   */
  async getUser(userId: Types.ObjectId) {
    return await this.userModel.findById(userId).lean();
  }
}
