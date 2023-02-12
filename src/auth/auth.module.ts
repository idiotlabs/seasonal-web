import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  providers: [AuthService, BearerStrategy],
})
export class AuthModule {}
