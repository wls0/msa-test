import { Types } from 'mongoose';
import { RewardType } from '../enum/reward.enum';
import { MongoId } from '../../common/decorator/mongo-objectid.decorator';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRewardReqDto {
  @MongoId()
  @IsNotEmpty()
  eventId: Types.ObjectId;

  @IsEnum(RewardType)
  @IsNotEmpty()
  rewardType: RewardType;

  @IsNumber()
  @IsNotEmpty()
  count: number;
}
