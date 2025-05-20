import { Types } from 'mongoose';
import { MongoId } from '../../common/decorator/mongo-objectid.decorator';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { RewardRequestStatus } from '../enum/reward-request.enum';
import { Pagination } from 'src/common/dto/common.dto';

export class CreateRewardRequestReqDto {
  @MongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @MongoId()
  @IsNotEmpty()
  eventId: Types.ObjectId;

  @IsEnum(RewardRequestStatus)
  @IsNotEmpty()
  status: RewardRequestStatus;
}

export class GetRewardRequestByManagerReqDto extends Pagination {
  @IsEnum(RewardRequestStatus)
  @IsOptional()
  status?: RewardRequestStatus;
}
