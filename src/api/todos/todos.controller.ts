import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';
import { TodoDocument } from '../../common/schema/todo.schema';
import { IResponseOk } from '../../common/interface/common.interface';
import { TodoDto, TodoUpdateDto } from './todo.dto';
import { ITodoCheckWeekend } from './todos.interfaces';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly loggerService: Logger,
    private readonly todoService: TodosService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<TodoDocument[]> {
    try {
      return await this.todoService.getAll();
    } catch (e) {
      this.loggerService.error(
        'Error in getAll method.',
        e.stack,
        TodosController.name,
      );
      throw e;
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(@Param('id') id): Promise<TodoDocument> {
    try {
      return await this.todoService.get({ id });
    } catch (e) {
      this.loggerService.error(
        'Error in get method.',
        e.stack,
        TodosController.name,
      );
      throw e;
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: TodoDto, @Req() { user }): Promise<IResponseOk> {
    try {
      return await this.todoService.create({
        ...data,
        user,
      });
    } catch (e) {
      this.loggerService.error(
        'Error in create method.',
        e.stack,
        TodosController.name,
      );
      throw e;
    }
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() data: TodoUpdateDto,
    @Param('id') id,
  ): Promise<IResponseOk> {
    try {
      return await this.todoService.update({ ...data, id });
    } catch (e) {
      this.loggerService.error(
        'Error in update method.',
        e.stack,
        TodosController.name,
      );
      throw e;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id): Promise<IResponseOk> {
    try {
      return await this.todoService.delete({ id });
    } catch (e) {
      this.loggerService.error(
        'Error in delete method.',
        e.stack,
        TodosController.name,
      );
      throw e;
    }
  }

  @Get('/check-weekend')
  @UseGuards(JwtAuthGuard)
  async checkWeekend(@Param('id') id): Promise<ITodoCheckWeekend> {
    try {
      return await this.todoService.checkWeekend({ id });
    } catch (e) {
      this.loggerService.error(
        'Error in checkWeekend method.',
        e.stack,
        TodosController.name,
      );
      throw e;
    }
  }
}
