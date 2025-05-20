import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRewardReqDto } from './dto/reward-req.dto';
import {
  CreateRewardRequestReqDto,
  GetRewardRequestByManagerReqDto,
} from './dto/reward-request-req.dto';
import { RewardRepository } from './repository/reward.repository';
import { RewardRequestRepository } from './repository/reward-request.repository';
import { RewardRequestStatus } from './enum/reward-request.enum';
import { Types } from 'mongoose';
import { Pagination } from '../common/dto/common.dto';
import { EventService } from '../event/event.service';

@Injectable()
export class RewardService {
  constructor(
    private readonly rewardRepository: RewardRepository,
    private readonly rewardRequestRepository: RewardRequestRepository,
    private readonly eventService: EventService,
  ) {}

  async createReward(body: CreateRewardReqDto) {
    const { eventId } = body;
    const [reward, event] = await Promise.all([
      this.rewardRepository.getRewardByEventId(eventId),
      this.eventService.getEvent({ eventId }),
    ]);

    if (reward) {
      throw new ConflictException('Reward already exists');
    }

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    await this.rewardRepository.createReward(body);

    return;
  }

  async getRewards(query: Pagination) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    return await this.rewardRepository.getRewards({ skip, limit });
  }

  async createRewardRequest(body: CreateRewardRequestReqDto) {
    const { userId, eventId } = body;

    const [reward, rewardRequest] = await Promise.all([
      this.rewardRepository.getRewardByEventId(eventId),
      this.rewardRequestRepository.getRewardRequestByUserIdAndEventId({
        userId,
        eventId,
      }),
    ]);

    if (rewardRequest) {
      throw new ConflictException('Reward request already exists');
    }

    if (!reward) {
      throw new ConflictException('Reward not found');
    }

    await this.rewardRequestRepository.createRewardRequest({
      userId,
      eventId,
      rewardId: reward._id,
      status: RewardRequestStatus.REQUESTED,
    });

    return;
  }

  async getRewardRequestByUserId(userId: Types.ObjectId, query: Pagination) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;
    return await this.rewardRequestRepository.getRewardRequestsByUserId({
      userId,
      skip,
      limit,
    });
  }

  async getRewardRequestByManager(query: GetRewardRequestByManagerReqDto) {
    const { page, limit, status } = query;
    const skip = (page - 1) * limit;

    return await this.rewardRequestRepository.getRewardRequestsByManager({
      skip,
      limit,
      status,
    });
  }
}
