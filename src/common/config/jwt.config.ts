import { ConfigModule, ConfigService } from '@nestjs/config';
// Jwt config
export const getJwtConfig = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '30d' },
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
};
