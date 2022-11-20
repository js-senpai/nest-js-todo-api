import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';
import { UserDocument } from '../../common/schema/user.schema';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { IAuthResponse } from './auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loggerService: Logger,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async auth(@Body() data: AuthDto): Promise<IAuthResponse> {
    try {
      return await this.authService.login(data);
    } catch (e) {
      this.loggerService.error(
        'Error in auth method',
        e.stack,
        AuthController.name,
      );
      throw e;
    }
  }

  @Get('/validate')
  @UseGuards(JwtAuthGuard)
  async validateUser(@Req() { user }): Promise<{ user: UserDocument }> {
    try {
      return user;
    } catch (e) {
      this.loggerService.error(
        'Error in validateUser method.',
        e.stack,
        AuthController.name,
      );
      throw e;
    }
  }
}
