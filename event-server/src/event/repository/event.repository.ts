import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from '../../model/event.model';
import { CreateEventReqDto } from '../dto/event-req.dto';

@Injectable()
export class EventRepository {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

  async createEvent(body: CreateEventReqDto) {
    return await this.eventModel.create(body);
  }

  async getEvents({ skip, limit }: { skip: number; limit: number }) {
    return await this.eventModel.find().skip(skip).limit(limit).lean();
  }

  async getEvent(eventId: Types.ObjectId) {
    return await this.eventModel.findById(eventId).lean();
  }
}
