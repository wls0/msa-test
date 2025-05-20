import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Reward } from '../../model/reward.model';
import { CreateRewardReqDto } from '../dto/reward-req.dto';

@Injectable()
export class RewardRepository {
  constructor(@InjectModel(Reward.name) private readonly rewardModel: Model<Reward>) {}

  async getRewards({ skip, limit }: { skip: number; limit: number }) {
    return await this.rewardModel
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('event')
      .lean();
  }

  async createReward(body: CreateRewardReqDto) {
    return await this.rewardModel.create(body);
  }

  async getRewardByEventId(eventId: Types.ObjectId) {
    return await this.rewardModel.findOne({ eventId }).sort({ _id: -1 }).lean();
  }
}
