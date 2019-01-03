import * as express from 'express';
import { FeedSource } from '../entity/FeedSource';
import feedSourceService from 'src/service/feed-source.service';

const feedSourceRouter = express.Router();

feedSourceRouter.get('/api/feed-sources', async (req, res, next) => {
  try {
    const feedSources: FeedSource[] = await feedSourceService.getFeedSources();
    return res.status(200).json(feedSources);
  } catch (error) {
    next(error);
  }
});

export { feedSourceRouter };
