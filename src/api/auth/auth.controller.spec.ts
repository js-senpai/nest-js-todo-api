import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../common/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtFactory } from '../../common/config/jwt.config';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../common/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from '../../common/config/mongo.config';

describe('AuthController', () => {
  let controller: AuthController;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.registerAsync(jwtFactory),
      ],
      providers: [Logger, AuthService, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
