import * as path from 'path';
import * as winston from 'winston';
const { combine, timestamp, prettyPrint } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.resolve(__dirname, '../../log/', 'application-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      format: winston.format.json(),
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});
