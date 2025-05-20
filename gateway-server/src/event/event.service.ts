import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateEventReqDto, GetEventReqDto } from './dto/event-req.dto';
import { Pagination } from 'src/common/dto/common.dto';
import { IUser } from 'src/common/interface/user.interface';
import { map, catchError } from 'rxjs';
import { CreateRewardReqDto } from './dto/reward-req.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  url = this.configService.get<string>('EVENT_SERVER_URL');

  async createEvent(body: CreateEventReqDto) {
    return this.httpService
      .post(`${this.url}/event`, body)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async getEvents(query: Pagination) {
    const { page, limit } = query;
    return this.httpService
      .get(`${this.url}/event?page=${Number(page)}&limit=${Number(limit)}`)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async getEvent(param: GetEventReqDto) {
    const { eventId } = param;
    return this.httpService
      .get(`${this.url}/event/${eventId}`)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async createReward(body: CreateRewardReqDto) {
    return this.httpService
      .post(`${this.url}/reward`, body)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async getRewards(query: Pagination) {
    const { page, limit } = query;
    return this.httpService
      .get(`${this.url}/reward?page=${Number(page)}&limit=${Number(limit)}`)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async createRewardRequest(user: IUser, body) {
    const userId = user._id.toString();
    return this.httpService
      .post(`${this.url}/reward/request`, { userId, ...body })
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async getRewardRequestByUserId(user: IUser, query: Pagination) {
    const { page, limit } = query;
    const userId = user._id.toString();
    return this.httpService
      .get(`${this.url}/reward/request?page=${Number(page)}&limit=${Number(limit)}`, {
        headers: {
          'user-id': String(userId),
        },
      })
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async getRewardRequestByManager(query) {
    const { page, limit } = query;
    return this.httpService
      .get(`${this.url}/reward/request/manager?page=${Number(page)}&limit=${Number(limit)}`)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }
}
