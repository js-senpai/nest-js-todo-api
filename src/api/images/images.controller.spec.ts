import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { Logger } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../../common/config/mongo.config';

describe('ImagesController', () => {
  let controller: ImagesController;

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
      ],
      providers: [Logger, ImagesService],
      controllers: [ImagesController],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
