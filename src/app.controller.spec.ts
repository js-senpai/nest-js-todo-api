import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './common/config/mongo.config';
import { AuthModule } from './api/auth/auth.module';
import { ImagesModule } from './api/images/images.module';
import { UsersModule } from './api/users/users.module';
import { TodosModule } from './api/todos/todos.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        // Config module
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: getMongoConfig,
          inject: [ConfigService],
        }),
        AuthModule,
        ImagesModule,
        UsersModule,
        TodosModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
