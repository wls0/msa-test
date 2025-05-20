import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let configService: ConfigService;

  jest.mock('bcrypt');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('login', () => {
    const body = {
      id: 'testId',
      password: 'testPassword',
    };
    it('정상 작동', async () => {
      const user = {
        _id: 'testId',
        password: 'hashedPassword',
      };

      userService.getUserInfoById = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue('testToken');

      const result = await service.login(body);

      expect(result).toEqual({ token: 'testToken' });
    });

    it('로그인 실패 아이디 없음', async () => {
      userService.getUserInfoById = jest.fn().mockResolvedValue(null);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await expect(service.login(body)).rejects.toThrow(new NotFoundException('User not found'));
    });

    it('로그인 실패 비밀번호 틀림', async () => {
      const user = {
        _id: 'testId',
        password: 'hashedPassword',
      };

      userService.getUserInfoById = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await expect(service.login(body)).rejects.toThrow(new ForbiddenException('Invalid password'));
    });
  });
});
