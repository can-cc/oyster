import * as express from 'express';
import * as path from 'path';
import * as colors from 'colors';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as morgan from 'morgan';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import * as bodyParser from 'body-parser';

import { getAtoms, markFeedRead, saveFeed, getVapidKey } from './dao';
import { fetchFeedSources } from './fetcher';

const feedsFileName = 'feeds.yml';
const feedsFilePath = path.join(__dirname, '../../', feedsFileName);

import './web-push';
import { setupWebPush, sendNotification } from './web-push';
import { authMiddle } from './middle/auth.middle';
import { logger } from './logger';
import webPushService from './service/web-push.service';

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
  // await createTablesIfNotExsits();

  setupWebPush();

  const feedSetting = getFeedSetting();
  fetchFeedSources(feedSetting, async (feeds: any[]) => {
    await Promise.all(feeds.map(saveFeed));
  });

  const app = express();

  app.use(morgan('tiny'));
  app.use(authMiddle);

  app.get('/new-unread/:limit', async (req, res) => {
    const atoms = await getAtoms(req.params.limit);
    res.json(atoms.reverse());
  });

  app.get('/api/client/config', async (req, res) => {
    const vapidPublicKey: string = (await getVapidKey()).publicKey;
    res.json({ vapidPublicKey });
  });

  app.post('/unread/:id', async (req, res) => {
    await markFeedRead(req.params.id);
    res.send('ok');
  });

  app.post('/api/webpush/subscribe', (req, res) => {
    const data = [];
    req.on('data', chunk => data.push(chunk));
    req.on('end', () => {
      const subscription: WebPushSubscription = JSON.parse(Buffer.concat(data).toString())
        .subscription;

      webPushService.addSubscription(subscription);
      res.status(204).send();
    });
  });

  app.post('/api/webpush/ping', (req, res) => {
    const { data }: { data: string } = req.body;
    const icon = `img/${Math.floor(Math.random() * 3)}.png`;
    const params = {
      title: "You've got a push-notification!!",
      msg: `Hi, this is message from server. It"s ${new Date().toLocaleString()} now. You can send any message, e.g. notification icons and so`,
      icon
    };
    Promise.all(
      webPushService.getSubscribers().map(subscription => {
        return sendNotification(subscription, JSON.stringify(params));
      })
    );
    res.status(204).send();
  });

  app.use('/api/v1/graphql', bodyParser.json(), graphqlExpress({ schema }));

  app.use('/api/v1/graphiql', graphiqlExpress({ endpointURL: '/api/v1/graphql' }));

  app.listen(7788);
  console.log(colors.green(`server start at http://localhost:7788`));
}

main();
