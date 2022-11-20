import { ConfigService } from '@nestjs/config';

// Get mongo db config
export const getMongoConfig = async (
  configService: ConfigService,
): Promise<{
  uri: string;
}> => ({
  uri: configService.get<string>('MONGO_URI'),
});
