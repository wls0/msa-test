import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginReqDto } from './dto/auth-req.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginReqDto) {
    const { id } = body;
    const user = await this.userService.getUserInfoById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const pwd = await bcrypt.compare(body.password, user.password);

    if (!pwd) {
      throw new ForbiddenException('Invalid password');
    }

    const token = this.jwtService.sign(
      {
        _id: user._id.toString(),
      },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: '1d' },
    );

    return { token };
  }
}
