import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

export const GetWinstonConfig = (): WinstonModuleOptions => ({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.label({
          label: '[LOGGER]',
        }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          (error) =>
            `[Nest]    - ${[error.timestamp]}  [${error.context}] :  ${
              error.level
            }: ${error.message}`,
        ),
      ),
    }),
    // Save info to log
    new winston.transports.File({
      filename: 'logs/Combined-' + new Date(Date.now()).toDateString() + '.log',
      level: 'info',
      handleExceptions: true,
    }),
    // Save errors to log
    new winston.transports.File({
      filename: 'logs/Errors-' + new Date(Date.now()).toDateString() + '.log',
      level: 'error',
    }),
  ],
});
