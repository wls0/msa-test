import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Types } from 'mongoose';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    const userId: string = headers['user-id'];

    const obj = new Types.ObjectId(userId);

    return obj;
  } catch (e) {
    if (e.name === 'BSONError') {
      throw new BadRequestException('Invalid request user ID');
    }

    throw new InternalServerErrorException();
  }
});
