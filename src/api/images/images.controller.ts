import {
  Controller,
  HttpStatus,
  Logger,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IImagesUploadResponse } from './images.intefaces';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly loggerService: Logger,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
      },
    }),
  )
  async upload(
    // Validate file
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<IImagesUploadResponse> {
    try {
      return await this.imagesService.upload(file);
    } catch (e) {
      this.loggerService.error(
        'Error in upload method.',
        e.stack,
        ImagesController.name,
      );
      throw e;
    }
  }
}
