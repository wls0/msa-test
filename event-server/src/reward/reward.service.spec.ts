import { Test, TestingModule } from '@nestjs/testing';
import { RewardService } from './reward.service';
import { RewardRequestRepository } from './repository/reward-request.repository';
import { RewardRepository } from './repository/reward.repository';
import { Types } from 'mongoose';
import { RewardType } from './enum/reward.enum';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RewardRequestStatus } from './enum/reward-request.enum';
import { EventService } from '../event/event.service';
import { EventModule } from '../event/event.module';

describe('RewardService', () => {
  let service: RewardService;
  let rewardRepository: RewardRepository;
  let rewardRequestRepository: RewardRequestRepository;
  let eventService: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardService,
        EventModule,
        { provide: RewardRepository, useValue: {} },
        { provide: RewardRequestRepository, useValue: {} },
        { provide: EventService, useValue: { getEvent: jest.fn() } },
      ],
    }).compile();

    service = module.get<RewardService>(RewardService);
    rewardRepository = module.get<RewardRepository>(RewardRepository);
    rewardRequestRepository = module.get<RewardRequestRepository>(RewardRequestRepository);
    eventService = module.get<EventService>(EventService);
  });

  describe('createReward', () => {
    it('정상 작동', async () => {
      const body = {
        eventId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
        rewardType: RewardType.POINT,
        count: 100,
      };
      rewardRepository.getRewardByEventId = jest.fn().mockResolvedValue(null);
      rewardRepository.createReward = jest.fn();
      eventService.getEvent = jest.fn().mockResolvedValue({});

      await service.createReward(body);

      expect(rewardRepository.createReward).toHaveBeenCalledWith(body);
    });

    it('보상이 이미 존재하는 경우', async () => {
      const body = {
        eventId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
        rewardType: RewardType.POINT,
        count: 100,
      };
      rewardRepository.getRewardByEventId = jest.fn().mockResolvedValue(body);

      expect(service.createReward(body)).rejects.toThrow(
        new ConflictException('Reward already exists'),
      );
    });

    it('이벤트가 없는 경우', async () => {
      const body = {
        eventId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
        rewardType: RewardType.POINT,
        count: 100,
      };
      rewardRepository.getRewardByEventId = jest.fn().mockResolvedValue(null);
      rewardRepository.createReward = jest.fn();
      eventService.getEvent = jest.fn().mockResolvedValue(null);

      expect(service.createReward(body)).rejects.toThrow(new NotFoundException('Event not found'));
    });
  });

  describe('getRewards', () => {
    it('정상 작동', async () => {
      const query = { page: 1, limit: 10 };
      const skip = (query.page - 1) * query.limit;
      const mockRewards = [
        {
          eventId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
          rewardType: RewardType.POINT,
          count: 100,
        },
      ];

      rewardRepository.getRewards = jest.fn().mockResolvedValue(mockRewards);

      const result = await service.getRewards(query);

      expect(rewardRepository.getRewards).toHaveBeenCalledWith({ skip, limit: query.limit });
      expect(result).toEqual(mockRewards);
    });
  });

  describe('createRewardRequest', () => {
    const body = {
      userId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
      eventId: new Types.ObjectId('249b8f1c4f1a2d3e4c5e6f7a'),
      status: RewardRequestStatus.REQUESTED,
    };

    const reward = {
      _id: new Types.ObjectId('149b8f1c4f1a2d3e4c5e6f7a'),
      eventId: new Types.ObjectId('249b8f1c4f1a2d3e4c5e6f7a'),
      rewardType: RewardType.POINT,
      count: 100,
    };

    const rewardRequest = {
      _id: new Types.ObjectId('349b8f1c4f1a2d3e4c5e6f7a'),
      userId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
      eventId: new Types.ObjectId('249b8f1c4f1a2d3e4c5e6f7a'),
      rewardId: new Types.ObjectId('149b8f1c4f1a2d3e4c5e6f7a'),
      status: RewardRequestStatus.REQUESTED,
    };

    it('정상 작동', async () => {
      rewardRepository.getRewardByEventId = jest.fn().mockResolvedValue(reward);
      rewardRequestRepository.getRewardRequestByUserIdAndEventId = jest
        .fn()
        .mockResolvedValue(null);
      rewardRequestRepository.createRewardRequest = jest.fn();

      await service.createRewardRequest(body);

      expect(rewardRequestRepository.createRewardRequest).toHaveBeenCalledWith({
        userId: body.userId,
        eventId: body.eventId,
        rewardId: reward._id,
        status: RewardRequestStatus.REQUESTED,
      });
    });

    it('보상 요청이 이미 존재하는 경우', async () => {
      rewardRepository.getRewardByEventId = jest.fn().mockResolvedValue(reward);
      rewardRequestRepository.getRewardRequestByUserIdAndEventId = jest
        .fn()
        .mockResolvedValue(rewardRequest);

      expect(service.createRewardRequest(body)).rejects.toThrow(
        new ConflictException('Reward request already exists'),
      );
    });

    it('보상이 존재하지 않는 경우', async () => {
      rewardRepository.getRewardByEventId = jest.fn().mockResolvedValue(null);
      rewardRequestRepository.getRewardRequestByUserIdAndEventId = jest
        .fn()
        .mockResolvedValue(null);

      expect(service.createRewardRequest(body)).rejects.toThrow(
        new ConflictException('Reward not found'),
      );
    });
  });
  describe('getRewardRequestByUserId', () => {
    it('정상 작동', async () => {
      const userId = new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a');
      const query = { page: 1, limit: 10 };
      const skip = (query.page - 1) * query.limit;
      const mockRewardRequests = [
        {
          _id: new Types.ObjectId('349b8f1c4f1a2d3e4c5e6f7a'),
          userId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
          eventId: new Types.ObjectId('249b8f1c4f1a2d3e4c5e6f7a'),
          rewardId: new Types.ObjectId('149b8f1c4f1a2d3e4c5e6f7a'),
          status: RewardRequestStatus.REQUESTED,
        },
      ];

      rewardRequestRepository.getRewardRequestsByUserId = jest
        .fn()
        .mockResolvedValue(mockRewardRequests);

      const result = await service.getRewardRequestByUserId(userId, query);

      expect(rewardRequestRepository.getRewardRequestsByUserId).toHaveBeenCalledWith({
        userId,
        skip,
        limit: query.limit,
      });
      expect(result).toEqual(mockRewardRequests);
    });
  });

  describe('getRewardRequestByManager', () => {
    it('정상 작동', async () => {
      const query = {
        page: 1,
        limit: 10,
        status: RewardRequestStatus.REQUESTED,
      };
      const skip = (query.page - 1) * query.limit;
      const mockRewardRequests = [
        {
          _id: new Types.ObjectId('349b8f1c4f1a2d3e4c5e6f7a'),
          userId: new Types.ObjectId('649b8f1c4f1a2d3e4c5e6f7a'),
          eventId: new Types.ObjectId('249b8f1c4f1a2d3e4c5e6f7a'),
          rewardId: new Types.ObjectId('149b8f1c4f1a2d3e4c5e6f7a'),
          status: RewardRequestStatus.REQUESTED,
        },
      ];

      rewardRequestRepository.getRewardRequestsByManager = jest
        .fn()
        .mockResolvedValue(mockRewardRequests);

      const result = await service.getRewardRequestByManager(query);

      expect(rewardRequestRepository.getRewardRequestsByManager).toHaveBeenCalledWith({
        skip,
        limit: query.limit,
        status: query.status,
      });
      expect(result).toEqual(mockRewardRequests);
    });
  });
});
