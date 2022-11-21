import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { GetWinstonConfig } from './common/config/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Replace default nest logger to winston logger
    logger: WinstonModule.createLogger(GetWinstonConfig()),
  });
  // Added global prefix for routes
  app.setGlobalPrefix('api');
  // Start app
  await app.listen(3500);
}
bootstrap();
