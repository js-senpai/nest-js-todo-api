import { Controller, Logger } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly loggerService: Logger) {}
}
