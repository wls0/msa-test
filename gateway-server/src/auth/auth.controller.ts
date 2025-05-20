import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RoleGuard } from 'src/common/role/role.guard';
import { Roles } from 'src/common/role/role.decorator';
import { RoleType } from 'src/common/role/role.enum';
import { JwtUserGuard } from 'src/common/jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('join')
  async join(@Body() body) {
    return await this.authService.join(body);
  }

  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @Patch('role')
  @Roles([RoleType.ADMIN])
  @UseGuards(JwtUserGuard, RoleGuard)
  async updateUserRole(@Body() body) {
    return await this.authService.updateUserRole(body);
  }
}
