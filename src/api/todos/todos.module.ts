import { Logger, Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  providers: [Logger, TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
