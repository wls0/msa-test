import { Types } from 'mongoose';
import { RewardRequestStatus } from '../enum/reward-request.enum';

export interface IRewardRequest {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  rewardId: Types.ObjectId;
  status: RewardRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetRewardRequestByUserIdAndEventId {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
}

export interface ICreateRewardRequest {
  userId: Types.ObjectId;
  eventId: Types.ObjectId;
  rewardId: Types.ObjectId;
  status: RewardRequestStatus;
}

export interface IGetRewardRequestsByUserId {
  userId: Types.ObjectId;
  skip: number;
  limit: number;
}

export interface IGetRewardRequestsByManager {
  skip: number;
  limit: number;
  status?: RewardRequestStatus;
}
