import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { setupServer } from './server';
import feedFetcherService from './service/feed-fetcher.service';
import webPushService from './service/web-push.service';

function main() {
  createConnection({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  })
    .then(() => {
      console.log('database connection successful.');

      feedFetcherService.pollFetch().then();

      webPushService.setup();

      setupServer();
    })
    .catch(error => console.log(error));
}

main();
