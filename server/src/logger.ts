import * as path from 'path';
import * as winston from 'winston';
import configure from './configure';
const { combine, timestamp, prettyPrint } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');
var Elasticsearch = require('winston-elasticsearch');

function generateElasticsearchIfConfigured() {
  if (!configure.getConfig('elasticsearch_index')) {
    return [];
  }
  return [
    new Elasticsearch({
      index: configure.getConfig('elasticsearch_index'),
      clientOpts: {
        node: configure.getConfig('elasticsearch_node'),
        maxRetries: 5,
        requestTimeout: 6000,
        auth: {
          username: configure.getConfig('elasticsearch_auth_username'),
          password: configure.getConfig('elasticsearch_auth_password')
        }
      },
      buffering: true
    })
  ];
}

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
    }),
    ...generateElasticsearchIfConfigured()
  ]
});
