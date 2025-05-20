import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RewardType } from '../reward/enum/reward.enum';
import { IReward } from '../reward/interface/reward.interface';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'reward',
  versionKey: false,
};

@Schema(options)
export class Reward implements IReward {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId })
  eventId: Types.ObjectId;

  @Prop({ type: String, enum: Object.values(RewardType), required: true })
  rewardType: RewardType;

  @Prop({ type: Number, required: true })
  count: number;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  event: Event;
}

export type RewardDocumentType = HydratedDocument<Reward>;
export const RewardSchema = SchemaFactory.createForClass(Reward);

RewardSchema.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
});
