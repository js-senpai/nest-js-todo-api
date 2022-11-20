import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [Logger, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
