import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { EventRepository } from './repository/event.repository';
import { EventType } from './enum/event.enum';
import { Types } from 'mongoose';

describe('EventService', () => {
  let service: EventService;
  let eventRepository: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, { provide: EventRepository, useValue: EventRepository }],
    }).compile();

    service = module.get<EventService>(EventService);
    eventRepository = module.get<EventRepository>(EventRepository);
  });

  describe('createEvent', () => {
    it('정상 작동', async () => {
      const body = {
        title: 'test',
        description: 'test',
        isActive: true,
        type: EventType.LOGIN,
        value: 3,
        startDate: new Date(),
        endDate: new Date(),
      };

      eventRepository.createEvent = jest.fn();

      await service.createEvent(body);

      expect(eventRepository.createEvent).toHaveBeenCalledWith(body);
    });
  });

  describe('getEvents', () => {
    const query = {
      page: 1,
      limit: 10,
    };

    it('정상 작동', async () => {
      const mockEvents = [
        {
          title: 'test',
          description: 'test',
          isActive: true,
          type: EventType.LOGIN,
          value: 3,
          startDate: new Date(),
          endDate: new Date(),
        },
      ];

      eventRepository.getEvents = jest.fn().mockResolvedValue(mockEvents);

      const result = await service.getEvents(query);

      expect(eventRepository.getEvents).toHaveBeenCalledWith({ skip: 0, limit: 10 });
      expect(result).toEqual(mockEvents);
    });
  });

  describe('getEvent', () => {
    it('정상 작동', async () => {
      const param = {
        eventId: new Types.ObjectId('507f1f77bcf86cd799439011'),
      };

      const mockEvent = {
        title: 'test',
        description: 'test',
        isActive: true,
        type: EventType.LOGIN,
        value: 3,
        startDate: new Date(),
        endDate: new Date(),
      };

      eventRepository.getEvent = jest.fn().mockResolvedValue(mockEvent);

      const result = await service.getEvent(param);

      expect(eventRepository.getEvent).toHaveBeenCalledWith(param.eventId);
      expect(result).toEqual(mockEvent);
    });
  });
});
