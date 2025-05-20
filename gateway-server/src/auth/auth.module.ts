import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
