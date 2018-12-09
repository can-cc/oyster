import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { setupServer } from './server';

function main() {
  createConnection()
  .then(async connection => {
    console.log('Here you can setup and run express/koa/any other framework.');

    setupServer();
  })
  .catch(error => console.log(error));
}



// async function main() {}

main();
