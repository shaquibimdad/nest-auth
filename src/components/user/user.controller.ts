import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: User) {
    return this.userService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.login(body, response);
  }

  @Get('user')
  async getUser(@Req() request: Request) {
    return this.userService.getUser(request);
  }

  @Get('refresh_token')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.refreshToken(request, response);
  }

  @Post('reset_password')
  async resetPassword(
    @Body() body: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.resetPassword(body, response);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.userService.logout(response);
  }
}
