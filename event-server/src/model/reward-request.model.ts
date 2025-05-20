import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RewardRequestStatus } from '../reward/enum/reward-request.enum';
import { IRewardRequest } from '../reward/interface/reward-request.interface';
import { Reward } from './reward.model';
import { User } from './user.model';
import { Event } from './event.model';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'reward-request',
  versionKey: false,
};

@Schema(options)
export class RewardRequest implements IRewardRequest {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  eventId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  rewardId: Types.ObjectId;

  @Prop({
    type: String,
    enum: Object.values(RewardRequestStatus),
    required: true,
    default: RewardRequestStatus.REQUESTED,
  })
  status: RewardRequestStatus;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  user: User;
  event: Event;
  reward: Reward;
}

export type RewardRequestDocumentType = HydratedDocument<RewardRequest>;
export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);

RewardRequestSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

RewardRequestSchema.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
});

RewardRequestSchema.virtual('reward', {
  ref: 'Reward',
  localField: 'rewardId',
  foreignField: '_id',
  justOne: true,
});
