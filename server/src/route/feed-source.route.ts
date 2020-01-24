import * as express from 'express';
import { FeedSource } from '../entity/feed-source';
import feedSourceService from '../service/feed-source.service';
import { feedRouter } from './feed.route';

const feedSourceRouter = express.Router();

feedSourceRouter.get('/api/feed-sources', async (req, res, next) => {
  try {
    const feedSources: FeedSource[] = await feedSourceService.getFeedSources();
    return res.status(200).json(feedSources);
  } catch (error) {
    next(error);
  }
});

feedRouter.get('/api/feed-source/:feedSourceId/count', async (req, res, next) => {
  const { startTime } = req.query;
  if (!startTime) {
    return res.status(400).send();
  }
});

export { feedSourceRouter };
