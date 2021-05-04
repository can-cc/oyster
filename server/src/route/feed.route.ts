import * as express from 'express';
import feedService from '../service/feed.service';
import feedMarkerService from '../service/feed-marker.service';
import { FeedMark } from '../entity/feed-mark';

const feedRouter = express.Router();

feedRouter.get('/api/feeds/:limit', async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const order = req.query.order || 'desc';
    if (order !== 'desc' && order !== 'asc') {
      return res.status(400).send();
    }
    const feeds = await feedService.getFeeds({
      userId,
      limit: Number(req.params.limit) || null, // 0 => null
      offset: req.query.offset,
      from: req.query.from,
      category: req.query.category,
      order,
    });
    return res.status(200).json(feeds);
  } catch (error) {
    next(error);
  }
});

feedRouter.post('/api/feed/:feedId/favorite', async (req, res, next) => {
  try {
    const feedId: string = req.params.feedId;
    const userId: number = req.auth.id;
    const feedMark: FeedMark = await feedMarkerService.markFeedFavorite({ userId, feedId });
    res.status(200).send(feedMark);
  } catch (error) {
    next(error);
  }
});

feedRouter.post('/api/feed/:feedId/unfavorite', async (req, res, next) => {
  try {
    const userId: number = req.auth.id;
    const feedId = req.params.feedId;
    await feedMarkerService.removeFeedFavoriteMark({ userId, feedId });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
