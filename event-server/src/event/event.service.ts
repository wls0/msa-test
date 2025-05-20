import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventRepository } from './repository/event.repository';
import { CreateEventReqDto, GetEventReqDto } from './dto/event-req.dto';
import { Pagination } from '../common/dto/common.dto';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(body: CreateEventReqDto) {
    await this.eventRepository.createEvent(body);
    return;
  }

  async getEvents(query: Pagination) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    return await this.eventRepository.getEvents({ skip, limit });
  }

  async getEvent(param: GetEventReqDto) {
    const { eventId } = param;
    return await this.eventRepository.getEvent(eventId);
  }
}
