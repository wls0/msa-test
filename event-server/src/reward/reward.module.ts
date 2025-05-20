import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { RewardRepository } from './repository/reward.repository';
import { RewardRequestRepository } from './repository/reward-request.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardSchema } from 'src/model/reward.model';
import { RewardRequestSchema } from 'src/model/reward-request.model';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reward', schema: RewardSchema },
      { name: 'RewardRequest', schema: RewardRequestSchema },
    ]),
    EventModule,
  ],
  controllers: [RewardController],
  providers: [RewardService, RewardRepository, RewardRequestRepository],
})
export class RewardModule {}
