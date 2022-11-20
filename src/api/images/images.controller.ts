import { Controller, Logger } from '@nestjs/common';

@Controller('images')
export class ImagesController {
  constructor(private readonly loggerService: Logger) {}
}
