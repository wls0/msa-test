import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { RewardRequest } from '../../model/reward-request.model';

import {
  ICreateRewardRequest,
  IGetRewardRequestByUserIdAndEventId,
  IGetRewardRequestsByManager,
  IGetRewardRequestsByUserId,
} from '../interface/reward-request.interface';

@Injectable()
export class RewardRequestRepository {
  constructor(
    @InjectModel(RewardRequest.name) private readonly rewardRequestModel: Model<RewardRequest>,
  ) {}

  async getRewardRequestByUserIdAndEventId(data: IGetRewardRequestByUserIdAndEventId) {
    return await this.rewardRequestModel.findOne(data).lean();
  }

  async createRewardRequest(data: ICreateRewardRequest) {
    return await this.rewardRequestModel.create(data);
  }

  async getRewardRequestsByUserId(data: IGetRewardRequestsByUserId) {
    const { userId, skip, limit } = data;

    return await this.rewardRequestModel
      .find({ userId })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  async getRewardRequestsByManager(data: IGetRewardRequestsByManager) {
    const { skip, limit, status } = data;
    const query = status ? { status } : {};
    return await this.rewardRequestModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }
}
