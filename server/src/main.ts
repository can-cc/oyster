import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { setupServer } from './server';
import feedFetcherService from './service/feed-fetcher.service';
import webPushService from './service/web-push.service';
import { getPostgresConfig } from './util/db-config';

function main() {
  createConnection(getPostgresConfig())
    .then(() => {
      console.log('database connection successful.');

      feedFetcherService.pollFetch().then();

      webPushService.setup();

      setupServer();
    })
    .catch(error => console.log(error));
}

main();
