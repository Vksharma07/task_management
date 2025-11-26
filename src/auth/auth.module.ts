import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN as unknown as JwtSignOptions['expiresIn']) ?? 3600,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
