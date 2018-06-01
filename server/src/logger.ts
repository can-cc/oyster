import * as path from 'path';
import * as winston from 'winston';
import * as moment from 'moment-timezone';

moment().local();

const volume = winston.format((info, opts) => {
  info.timestamp = moment()
    .tz('Asia/Shanghai')
    .format('YYYY-MM-DD, hh:mm:ss');

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
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
