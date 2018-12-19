import * as path from 'path';
import * as winston from 'winston';

const volume = winston.format((info, opts) => {
  info.timestamp = new Date().getTime();
  return info;
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.json(), volume()),
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
