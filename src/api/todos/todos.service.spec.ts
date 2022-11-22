import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../common/schema/user.schema';
import { Todo, TodoSchema } from '../../common/schema/todo.schema';
import { Logger } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../../common/config/mongo.config';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Config module
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: getMongoConfig,
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Todo.name, schema: TodoSchema },
        ]),
      ],
      providers: [Logger, TodosService],
      controllers: [TodosController],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
