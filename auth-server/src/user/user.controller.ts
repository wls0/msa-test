import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserReqDto, UpdateUserRoleReqDto } from './dto/user-req.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  async join(@Body() body: CreateUserReqDto) {
    return await this.userService.createUser(body);
  }

  @Patch('role')
  async updatePermission(@Body() body: UpdateUserRoleReqDto) {
    return await this.userService.updateUserRole(body);
  }
}
