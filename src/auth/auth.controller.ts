import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log({
      email: dto.email,
      typeOfemail: typeof dto.email,
      password: dto.password,
      typeOfpassword: typeof dto.password,
    });
    return this.authservice.signup();
  }

  @Post('signin')
  signin() {
    return this.authservice.signin();
  }
}
