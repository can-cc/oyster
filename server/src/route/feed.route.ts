import * as express from 'express';
import feedService from '../service/feed.service';

const feedRouter = express.Router();

feedRouter.get('/api/feeds/:limit', async (req, res, next) => {
  try {
    const feeds = await feedService.getFeeds(req.params.limit, req.query.offset);
    return res.status(200).json(feeds);
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
