import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { EventService } from './event.service';
import { CreateEventReqDto, GetEventReqDto } from './dto/event-req.dto';
import { Pagination } from '../common/dto/common.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/')
  async createEvent(@Body() body: CreateEventReqDto) {
    return await this.eventService.createEvent(body);
  }

  @Get('/')
  async getEvents(@Query() query: Pagination) {
    return await this.eventService.getEvents(query);
  }

  @Get('/:eventId')
  async getEvent(@Param() param: GetEventReqDto) {
    return await this.eventService.getEvent(param);
  }
}
