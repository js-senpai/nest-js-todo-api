import { Logger, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  providers: [Logger, ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
