import * as express from 'express';
import * as path from 'path';
import * as colors from 'colors';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import * as bodyParser from 'body-parser';

import { createTablesIfNotExsits } from './db';
import { getAtoms, insertToAtom, makeAtomRead } from './dao';
import { fetchFeedSources } from './fetcher';

const feedsFileName = 'feeds.yml';
const feedsFilePath = path.join(__dirname, '../../', feedsFileName);

function checkFeedFileExist() {
  if (!fs.existsSync(feedsFilePath)) {
    console.log('check your `~/.feeds` file');
    process.exit();
  }
}

function getFeeds() {
  const feeds = yaml.safeLoad(fs.readFileSync(feedsFilePath, 'utf8')).feeds;
  return feeds;
}

const typeDefs = `
  type Query { feeds(limit: Int! offset: Int): [Feed] }
  type Feed { title: String, author: String, content: String, published: Float, isRead: Boolean }
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
  await createTablesIfNotExsits();

  const feedSources = getFeeds();
  fetchFeedSources(feedSources, async (error, feeds) => {
    if (error) {
      console.error(error);
    } else {
      await Promise.all(feeds.map(insertToAtom));
    }
  });

  const app = express();

  app.get('/new-unread/:limit', async (req, res) => {
    const atoms = await getAtoms(req.params.limit);
    res.json(atoms.reverse());
  });

  app.post('/unread/:id', async (req, res) => {
    await makeAtomRead(req.params.id);
    res.send('ok');
  });

  app.use('/api/v1/graphql', bodyParser.json(), graphqlExpress({ schema }));

  app.use('/api/v1/graphiql', graphiqlExpress({ endpointURL: '/api/v1/graphql' }));

  app.listen(7788);
  console.log(colors.green(`server start at http://localhost:7788`));
}

main();
