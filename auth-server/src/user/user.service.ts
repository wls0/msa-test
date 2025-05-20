import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserRepository } from './repository/user.repository';
import { CreateUserReqDto, UpdateUserRoleReqDto } from './dto/user-req.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async getUserInfoById(id: string) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserReqDto) {
    const { id, password, roles } = data;

    const user = await this.userRepository.getUserById(id);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const salt = bcrypt.genSaltSync(Number(this.configService.get('BCRYPT_ROUND')));
    const savePassword = bcrypt.hashSync(password, salt);

    await this.userRepository.createUser({
      id,
      password: savePassword,
      roles,
    });

    return;
  }

  async updateUserRole(data: UpdateUserRoleReqDto) {
    const { userId, roles } = data;

    const user = await this.userRepository.getUserByIndex(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.updateUserRole({
      userId: userId,
      roles,
    });
    return;
  }
}
