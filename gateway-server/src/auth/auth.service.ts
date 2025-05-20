import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  url = this.configService.get('AUTH_SERVER_URL');

  async join(body) {
    return this.httpService
      .post(`${this.url}/user/join`, body)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async login(body) {
    return this.httpService
      .post(`${this.url}/auth/login`, body)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }

  async updateUserRole(body) {
    return this.httpService
      .patch(`${this.url}/user/role`, body)
      .pipe(map((response) => response.data))
      .pipe(
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
  }
}
