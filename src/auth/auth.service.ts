import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UsersService } from '../users/users.service';
import { ILooseObject } from 'interfaces';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) { }

  async login(dto: ILooseObject) {
    const payload = { sub: dto.userName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
