import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { ConfigService } from '@nestjs/config';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { RoleType } from './enum/role.enum';
import { Types } from 'mongoose';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('getUserInfoById', () => {
    const id = 'testId';
    it('유저가 없을 때', async () => {
      userRepository.getUserById = jest.fn().mockResolvedValue(null);
      await expect(service.getUserInfoById(id)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });

    it('정상 작동', async () => {
      const user = { id: 'testId', password: 'testPassword', roles: ['user'] };
      userRepository.getUserById = jest.fn().mockResolvedValue(user);
      const result = await service.getUserInfoById(id);
      expect(result).toEqual(user);
    });
  });
  describe('createUser', () => {
    const data = {
      id: 'testId',
      password: 'testPassword',
      roles: [RoleType.USER],
    };
    it('유저가 이미 존재할 때', async () => {
      userRepository.getUserById = jest.fn().mockResolvedValue(data);
      await expect(service.createUser(data)).rejects.toThrow(
        new ConflictException('User already exists'),
      );
    });

    it('정상 작동', async () => {
      userRepository.getUserById = jest.fn().mockResolvedValue(null);
      userRepository.createUser = jest.fn().mockResolvedValue(null);
      configService.get = jest.fn().mockReturnValue(10);
      await service.createUser(data);

      expect(userRepository.createUser).toHaveBeenCalled();
    });
  });
  describe('updateUserRole', () => {
    const data = {
      userId: new Types.ObjectId('6827096e9ccf465e44c1290f'),
      roles: [RoleType.USER],
    };
    it('유저가 없을 때', async () => {
      userRepository.getUserByIndex = jest.fn().mockResolvedValue(null);
      await expect(service.updateUserRole(data)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });

    it('정상 작동', async () => {
      userRepository.getUserByIndex = jest.fn().mockResolvedValue(data);
      userRepository.updateUserRole = jest.fn();
      await service.updateUserRole(data);

      expect(userRepository.updateUserRole).toHaveBeenCalledWith({
        userId: data.userId,
        roles: data.roles,
      });
    });
  });
});
