import * as express from 'express';
import feedService from '../service/feed.service';
import feedMarkerService from '../service/feed-marker.service';
import { FeedMark } from '../entity/feed-mark';

const feedRouter = express.Router();

feedRouter.get('/api/feeds/:limit', async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const feeds = await feedService.getFeeds({
      userId,
      limit: req.params.limit,
      offset: req.query.offset,
      category: req.query.category
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
    const feedMark: FeedMark =  await feedMarkerService.markFeedFavorite({ userId, feedId });
    res.status(200).send(feedMark);
  } catch (error) {
    next(error);
  }
});

feedRouter.delete('/api/feed/:feedId/favorite/:markId', async (req, res, next) => {
  try {
    const markId: string = req.params.markId;
    const userId: number = req.auth.id;
    await feedMarkerService.removeFeedFavoriteMark({ userId, markId });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

export { feedRouter };
