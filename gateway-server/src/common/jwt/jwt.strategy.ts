import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayload } from './jwt.interface';
import { JwtService } from './jwt.service';
import { IUser } from '../interface/user.interface';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IJwtPayload): Promise<IUser | null> {
    const { _id } = payload;
    try {
      if (_id) {
        const userId = new Types.ObjectId(_id);
        const user = await this.jwtService.getUser(userId);

        return user;
      } else {
        throw new ForbiddenException('wrong token');
      }
    } catch (err) {
      throw new UnauthorizedException({ message: err.message });
    }
  }
}
