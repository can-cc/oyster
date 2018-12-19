import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';
import * as colors from 'colors';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as htmlToText from 'html-to-text';
import * as useragent from 'express-useragent';
import { authRouter } from './route/auth.route';
import configure from './configure';
import { schema } from './graphql/schema';

import { getVapidKey } from './dao';

const feedsFile = path.resolve(__dirname, '../..', configure.getConfig('FEED_FILE_PATH'));

import { setupWebPush } from './web-push';
import { logger } from './logger';

import webPushService from './service/web-push.service';
import feedFetcherService from './service/feed-fetcher.service';
import { authMiddle } from './route/middle/auth.middle';
import feedService from './service/feed.service';

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

function checkFeedFileExist() {
  if (!fs.existsSync(feedsFile)) {
    console.log('check your `feeds.yml` file');
    process.exit();
  }
}

export function setupServer() {
  checkFeedFileExist();

  setupWebPush();

  feedFetcherService.pollFetch();

  const app = express();

  app.use(morgan('tiny'));
  app.use(require('body-parser').json());
  app.use(useragent.express());

  app.use('/api', authRouter);

  app.use('/api/v1/graphql', graphqlExpress({ schema }));
  app.use('/api/v1/graphiql', graphiqlExpress({ endpointURL: '/api/v1/graphql' }));

  app.use(authMiddle);

  app.get('/api/client/config', async (req, res) => {
    try {
      const vapidPublicKey: string = (await getVapidKey()).publicKey;
      res.json({ vapidPublicKey });
    } catch (error) {
      throw error;
    }
  });

  app.get('/api/atoms/:limit', async (req, res, next) => {
    try {
      const atoms = await feedService.getFeeds(req.params.limit, req.query.offset);
      return res.status(200).json(atoms);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/webpush/subscribe', (req, res) => {
    try {
      const subscription: WebPushSubscription = req.body.subscription;
      const userAgent: string = req.useragent.source;
      webPushService.addSubscription(subscription, userAgent);
      res.status(204).send();
    } catch (error) {
      throw error;
    }
  });

  app.post('/api/webpush/ping', async (req, res) => {
    try {
      const { msg }: { msg: string } = req.body;
      const content = htmlToText.fromString(msg);
      const params = {
        title: 'Pong!',
        content,
        link: ''
      };
      await Promise.all(
        webPushService.getSubscribers().map(subscription => {
          return webPushService.sendNotification(subscription, params);
        })
      );
      res.status(204).send();
    } catch (error) {
      throw error;
    }
  });

  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ error: 'unknown' });
  });

  app.listen(7788, '0.0.0.0');
  console.log(colors.green(`server start at http://localhost:7788`));
}
