import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, IsEmail, isString } from 'class-validator';

class LoginDto {
  @IsString()
  userName!: string;

}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
