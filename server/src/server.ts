import * as express from 'express';
import * as path from 'path';
import * as colors from 'colors';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as morgan from 'morgan';
import * as useragent from 'express-useragent';
import * as htmlToText from 'html-to-text';
import { authRouter } from './route/auth.route';
import configure from './configure';
import { schema } from './graphql/schema';

import 'reflect-metadata';

import { getAtoms, saveFeed, getVapidKey, isFeedExist } from './dao';
import { fetchFeedSources } from './fetcher';

const feedsFile = path.resolve(__dirname, '../..', configure.getConfig('FEED_FILE_PATH'));

import { setupWebPush, sendNotification } from './web-push';
import { logger } from './logger';

import webPushService from './service/web-push.service';
import { authMiddle } from './route/middle/auth.middle';

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

function checkFeedFileExist() {
  if (!fs.existsSync(feedsFile)) {
    console.log('check your `feeds.yml` file');
    process.exit();
  }
}

function getFeedSetting() {
  const feeds = yaml.safeLoad(fs.readFileSync(feedsFile, 'utf8'));
  return feeds;
}

export function setupServer() {
  checkFeedFileExist();

  setupWebPush();

  const feedSetting: FeedSetting = getFeedSetting();

  try {
    fetchFeedSources(feedSetting, async (feeds: any[]) => {
      await Promise.all(
        feeds.map(
          async (feed: Feed): Promise<void> => {
            if (!(await isFeedExist(feed))) {
              await saveFeed(feed);
              await Promise.all(
                webPushService.getSubscribers().map(
                  (subscription: WebPushSubscription): Promise<void> => {
                    const content = htmlToText.fromString(feed.content, {
                      ignoreImage: true,
                      ignoreHref: true,
                      wordwrap: false
                    });
                    return sendNotification(subscription, {
                      title: feed.title,
                      content,
                      link: feed.link
                    });
                  }
                )
              );
            }
          }
        )
      );
    });
  } catch (error) {
    logger.error(error);
  }

  const app = express();

  app.use(morgan('tiny'));
  app.use(require('body-parser').json());
  app.use(useragent.express());

  app.use('/api', authRouter);

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
      const atoms = await getAtoms(req.params.limit, req.query.offset);
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
          return sendNotification(subscription, params);
        })
      );
      res.status(204).send();
    } catch (error) {
      throw error;
    }
  });

  app.use('/api/v1/graphql', graphqlExpress({ schema }));

  app.use('/api/v1/graphiql', graphiqlExpress({ endpointURL: '/api/v1/graphql' }));

  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ error: 'unknown' });
  });

  app.listen(7788, '0.0.0.0');
  console.log(colors.green(`server start at http://localhost:7788`));
}
