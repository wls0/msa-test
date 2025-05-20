import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtUserGuard } from './jwt.guard';
import { JwtService } from './jwt.service';
import { JwtUserStrategy } from './jwt.strategy';
import { User, UserSchema } from '../../model/user.model';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [JwtService, JwtUserGuard, JwtUserStrategy],
  exports: [JwtService],
})
export class JwtModule {}
