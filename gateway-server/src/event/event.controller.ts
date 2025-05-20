import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { RoleGuard } from 'src/common/role/role.guard';
import { JwtUserGuard } from 'src/common/jwt/jwt.guard';
import { CreateEventReqDto, GetEventReqDto } from './dto/event-req.dto';
import { Pagination } from '../common/dto/common.dto';
import {
  CreateRewardRequestReqDto,
  GetRewardRequestByManagerReqDto,
} from './dto/reward-request-req.dto';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { IUser } from 'src/common/interface/user.interface';
import { Roles } from 'src/common/role/role.decorator';
import { RoleType } from 'src/common/role/role.enum';
import { CreateRewardReqDto } from './dto/reward-req.dto';

@Controller('event')
@UseGuards(JwtUserGuard, RoleGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  //이벤트 등록
  @Post('/')
  @Roles([RoleType.ADMIN, RoleType.OPERATOR])
  async createEvent(@Body() body: CreateEventReqDto) {
    return await this.eventService.createEvent(body);
  }

  //이벤트 조회
  @Get('/')
  @Roles([])
  async getEvents(@Query() query: Pagination) {
    return await this.eventService.getEvents(query);
  }

  // 이벤트 상세 조회
  @Get('/detail/:eventId')
  @Roles([])
  async getEvent(@Param() param: GetEventReqDto) {
    return await this.eventService.getEvent(param);
  }

  //이벤트 보상 조회
  @Get('/reward')
  @Roles([])
  async getRewards(@Query() query: Pagination) {
    return await this.eventService.getRewards(query);
  }
  //이벤트 보상 등록
  @Post('/reward')
  @Roles([RoleType.ADMIN, RoleType.OPERATOR])
  async createReward(@Body() body: CreateRewardReqDto) {
    return await this.eventService.createReward(body);
  }

  @Post('/reward/request')
  @Roles([RoleType.USER])
  async createRewardRequest(@CurrentUser() user: IUser, @Body() body) {
    return await this.eventService.createRewardRequest(user, body);
  }

  //이벤트 보상 요청 유저 조회
  @Get('/reward/request')
  @Roles([RoleType.USER])
  async getRewardRequestByUserId(@CurrentUser() userId: IUser, @Query() query: Pagination) {
    return await this.eventService.getRewardRequestByUserId(userId, query);
  }
  //이벤트 보상 요청 관리자 조회
  @Get('/reward/request/manager')
  @Roles([RoleType.ADMIN, RoleType.OPERATOR, RoleType.AUDITOR])
  async getRewardRequestByManager(@Query() query: GetRewardRequestByManagerReqDto) {
    return await this.eventService.getRewardRequestByManager(query);
  }
}
