import { Injectable } from '@nestjs/common';
import { IImagesUploadResponse } from './images.intefaces';
import { ConfigService } from '@nestjs/config';
import { request, FormData } from 'undici';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}
  async upload(file: Express.Multer.File): Promise<IImagesUploadResponse> {
    const formData = new FormData();
    // Get file content for convert from buffer to blob
    const fileContent = Buffer.from(file.buffer);
    formData.append('file', new Blob([fileContent]), file.originalname);
    formData.append(
      'upload_preset',
      this.configService.get('CLOUDINARY_PRESET'),
    );
    formData.append('public_id', file.originalname.replace(/(\..*)$/g, ''));
    // Send image to cloudinary
    const { body } = await request(
      `${this.configService.get('CLOUDINARY_URL')}`,
      {
        method: 'POST',
        body: formData,
      },
    );
    const { url } = await body.json();
    return {
      url,
    };
  }
}
