
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const user = await this.authService.validateUser(signInDto.email, signInDto.pass)
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return await this.authService.signIn(user.email,user.password);
    
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('Admin','Customer','EDITOR') 
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req)
    return req.user;
  }
}
