import * as express from 'express';
import * as path from 'path';
import * as colors from 'colors';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as morgan from 'morgan';

import { getAtoms, markFeedRead, saveFeed, getVapidKey, isFeedExist } from './dao';
import { fetchFeedSources } from './fetcher';

const feedsFileName = 'feeds.yml';
const feedsFilePath = path.join(__dirname, '../../', feedsFileName);

import { setupWebPush, sendNotification } from './web-push';
import { authMiddle } from './middle/auth.middle';
import { logger } from './logger';

import webPushService from './service/web-push.service';

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

function checkFeedFileExist() {
  if (!fs.existsSync(feedsFilePath)) {
    console.log('check your `feeds.yml` file');
    process.exit();
  }
}

function getFeedSetting() {
  const feeds = yaml.safeLoad(fs.readFileSync(feedsFilePath, 'utf8'));
  return feeds;
}

const typeDefs = `
  type Query { feeds(limit: Int! offset: Int): [Feed] }
  type Feed { id: Int, title: String, author: String, link: String, source: String, content: String, published: Float, isRead: Boolean }
`;

// The resolvers
const resolvers = {
  Query: {
    feeds: async (root, args: { limit: number; offset?: number }, context) => {
      return await getAtoms(args.limit, args.offset);
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

async function main() {
  checkFeedFileExist();

  setupWebPush();

  const feedSetting: FeedSetting = getFeedSetting();

  try {
    fetchFeedSources(feedSetting, async (feeds: any[]) => {
      await Promise.all(
        feeds.map(async (feed: Feed): Promise<void> => {
          if (!await isFeedExist(feed)) {
            await saveFeed(feed);
            await Promise.all(
              webPushService.getSubscribers().map((subscription: WebPushSubscription): Promise<
                void
              > => {
                return sendNotification(subscription, {
                  title: feed.title,
                  msg: feed.content
                });
              })
            );
          }
        })
      );
    });
  } catch (error) {
    logger.error(error);
  }

  const app = express();

  app.use(morgan('tiny'));
  app.use(require('body-parser').json());
  app.use(authMiddle);

  app.get('/new-unread/:limit', async (req, res) => {
    try {
      const atoms = await getAtoms(req.params.limit);
      res.json(atoms.reverse());
    } catch (error) {
      throw error;
    }
  });

  app.get('/api/client/config', async (req, res) => {
    try {
      const vapidPublicKey: string = (await getVapidKey()).publicKey;
      res.json({ vapidPublicKey });
    } catch (error) {
      throw error;
    }
  });

  app.post('/unread/:id', async (req, res) => {
    try {
      await markFeedRead(req.params.id);
      res.send('ok');
    } catch (error) {
      throw error;
    }
  });

  app.post('/api/webpush/subscribe', (req, res) => {
    try {
      const subscription: WebPushSubscription = req.body.subscription;
      webPushService.addSubscription(subscription);
      res.status(204).send();
    } catch (error) {
      throw error;
    }
  });

  app.post('/api/webpush/ping', async (req, res) => {
    try {
      const { msg }: { msg: string } = req.body;
      const params = {
        title: "You've got a push-notification!!",
        msg
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
    next(err);
  });

  app.listen(7788);
  console.log(colors.green(`server start at http://localhost:7788`));
}

main();
