import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { setupServer } from './server';
import feedFetcherService from './service/feed-fetcher.service';
import webPushService from './service/web-push.service';
import { getPostgresConfig } from './util/db-config';
import * as colors from 'colors';
import { setAxiosGlobalProxy } from './helper/axios-helper';
import { startApmIfConfigured } from './integrated/elastic-apm';

function main() {
  startApmIfConfigured();

  setAxiosGlobalProxy();
  const dbConfig = getPostgresConfig();

  createConnection(dbConfig)
    .then((connection: Connection) => {
      connection.runMigrations();

      console.log(colors.yellow(`connect postgres ${dbConfig.host}:5432/${dbConfig.database}`));
      console.log('database connection successful.');

      feedFetcherService.pollFetch().then();

      webPushService.setup();

      setupServer();
    })
    .catch((error) => console.log(error));
}

main();
