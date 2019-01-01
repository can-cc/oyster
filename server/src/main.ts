import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { setupServer } from './server';
import feedFetcherService from './service/feed-fetcher.service';

function main() {
  createConnection()
    .then(() => {
      console.log('database connection successful.');

      feedFetcherService.pollFetch().then();

      setupServer();
    })
    .catch(error => console.log(error));
}

main();
