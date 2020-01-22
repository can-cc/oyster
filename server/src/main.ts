import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { setupServer } from './server';
import feedFetcherService from './service/feed-fetcher.service';
import webPushService from './service/web-push.service';
import { getPostgresConfig } from './util/db-config';
import * as colors from 'colors';


function main() {
  const dbConfig = getPostgresConfig();
  createConnection(dbConfig)
    .then(() => {
      console.log(colors.yellow(`connect postgres ${dbConfig.host}:5432/${dbConfig.database}`))
      console.log('database connection successful.');

      feedFetcherService.pollFetch().then();

      webPushService.setup();

      setupServer();
    })
    .catch(error => console.log(error));
}

main();
