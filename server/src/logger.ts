import * as path from 'path';
import * as winston from 'winston';

export const logger =  winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/', 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/', 'combined.log')
    })
  ]
});

export const fetchLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../log/', 'fetch.log'),
    }),
  ]
});

