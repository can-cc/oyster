import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';
import * as colors from 'colors';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as useragent from 'express-useragent';
import { authRouter } from './route/auth.route';
import configure from './configure';
import { graphqlServer } from './graphql/schema';

// const feedsFile = path.resolve(__dirname, '../..', configure.getConfig('FEED_FILE_PATH'));

import { setupWebPush } from './web-push';
import { logger } from './logger';

import feedFetcherService from './service/feed-fetcher.service';
import { authMiddle } from './route/middle/auth.middle';
import { feedRouter } from './route/feed.route';
import { pignRouter } from './route/ping.route';
import { webpushRouter } from './route/webpush.route';

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

// function checkFeedFileExist() {
//   if (!fs.existsSync(feedsFile)) {
//     console.log('check your `feeds.yml` file');
//     process.exit();
//   }
// }

export function setupServer() {
  // checkFeedFileExist();

  setupWebPush();
  
  const app = express();

  app.use(morgan('tiny'));
  // TODO remove
  app.use(require('body-parser').json());
  app.use(useragent.express());

  graphqlServer.applyMiddleware({ app, path: '/api/v1/graphql' });

  app.use('/api', authRouter);

  app.use(authMiddle);

  app.use(feedRouter);
  app.use(pignRouter);
  app.use(webpushRouter);

  app.use((error, req, res, next) => {
    console.error(error);
    if (error.name === 'QueryFailedError') {
      res.status(409).send();
    } else {
      res.status(500).send();
    }
  });

  app.listen(7788, '0.0.0.0');
  console.log(colors.green(`server start at http://localhost:7788`));
  console.log(`🚀 Server ready at http://localhost:7788${graphqlServer.graphqlPath}`);
}
