import * as express from 'express';
import * as colors from 'colors';
import * as morgan from 'morgan';
import * as useragent from 'express-useragent';
import { authRouter } from './route/auth.route';
import { graphqlServer } from './graphql/schema';
import { authMiddle } from './route/middle/auth.middle';
import { feedRouter } from './route/feed.route';
import { pignRouter } from './route/ping.route';
import { webpushRouter } from './route/webpush.route';
import { feedSourceRouter } from './route/feed-source.route';
import { feedSourceFaviconRouter } from './route/feed-source-favicon.route';
import { logger } from './logger';

export function setupServer() {
  const app = express();

  app.use(morgan('tiny'));

  app.use(require('body-parser').json());
  app.use(useragent.express());

  app.use('/api', authRouter);
  app.use('/api', feedSourceFaviconRouter);

  app.use(authMiddle);

  graphqlServer.applyMiddleware({ app, path: '/api/v1/graphql' });

  app.use(feedRouter);
  app.use(feedSourceRouter);
  app.use(pignRouter);
  app.use(webpushRouter);

  app.use((error, req, res, next) => {
    logger.error(error);
    if (error.name === 'QueryFailedError') {
      res.status(409).send();
    } else {
      res.status(500).send();
    }
  });

  app.listen(7788, '0.0.0.0');
  console.log(colors.green(`server ready at http://0.0.0.0:7788`));
  console.log(`🚀 graphql Server ready at http://0.0.0.0:7788${graphqlServer.graphqlPath}`);
}
