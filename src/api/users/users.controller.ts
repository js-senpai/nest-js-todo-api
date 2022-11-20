import { Controller, Logger } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly loggerService: Logger) {}
}
