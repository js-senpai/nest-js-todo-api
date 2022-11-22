import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserPasswordDto } from './users.dto';
import { IResponseOk } from '../../common/interface/common.interface';
import { Roles } from '../../common/decorator/role.decorator';
import { UserRole } from '../../common/schema/user.schema';
import { RolesGuard } from '../../common/guard/role.guard';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly loggerService: Logger,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() data: UserDto): Promise<IResponseOk> {
    try {
      return await this.userService.create(data);
    } catch (e) {
      this.loggerService.error(
        'Error in create method.',
        e.stack,
        UsersController.name,
      );
      throw e;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() { user }, @Param('id') id): Promise<IResponseOk> {
    try {
      return await this.userService.delete({ id, user });
    } catch (e) {
      this.loggerService.error(
        'Error in delete method.',
        e.stack,
        UsersController.name,
      );
      throw e;
    }
  }
  @Put('/password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  async updatePassword(
    @Body() data: UserPasswordDto,
    @Req() { user },
  ): Promise<IResponseOk> {
    try {
      return await this.userService.updatePassword({ ...data, user });
    } catch (e) {
      this.loggerService.error(
        'Error in updatePassword method.',
        e.stack,
        UsersController.name,
      );
      throw e;
    }
  }
}
