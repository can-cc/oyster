import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  // logger.add(
  //   new winston.transports.Console({
  //     format: winston.format.simple()
  //   })
  // );
}
