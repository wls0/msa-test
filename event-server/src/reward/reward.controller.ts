import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardReqDto } from './dto/reward-req.dto';
import {
  CreateRewardRequestReqDto,
  GetRewardRequestByManagerReqDto,
} from './dto/reward-request-req.dto';
import { CurrentUser } from '../common/decorators/user.decorator';

import { Pagination } from '../common/dto/common.dto';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post('/')
  async createReward(@Body() body: CreateRewardReqDto) {
    return await this.rewardService.createReward(body);
  }

  @Get('/')
  async getRewards(@Query() query: Pagination) {
    return await this.rewardService.getRewards(query);
  }

  @Post('/request')
  async createRewardRequest(@Body() body: CreateRewardRequestReqDto) {
    return await this.rewardService.createRewardRequest(body);
  }

  @Get('/request')
  async getRewardRequestByUserId(@CurrentUser() userId, @Query() query: Pagination) {
    return await this.rewardService.getRewardRequestByUserId(userId, query);
  }

  @Get('/request/manager')
  async getRewardRequestByManager(@Query() query: GetRewardRequestByManagerReqDto) {
    return await this.rewardService.getRewardRequestByManager(query);
  }
}
