import * as winston from 'winston';
import * as moment from 'moment-timezone';

moment().local();

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
  transports: [
    new winston.transports.File({
      timestamp: () => {
        return moment()
          .tz('Asia/Shanghai')
          .format('dddd, MMMM Do YYYY, h:mm:ss a');
      },
      filename: 'error.log',
      level: 'error'
    }),
    new winston.transports.File({
      timestamp: () => {
        return moment()
          .tz('Asia/Shanghai')
          .format('dddd, MMMM Do YYYY, h:mm:ss a');
      },
      filename: 'combined.log'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      timestamp: () => {
        return moment()
          .tz('Asia/Shanghai')
          .format('dddd, MMMM Do YYYY, h:mm:ss a');
      },
      format: winston.format.simple()
    })
  );
}
