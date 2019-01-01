import * as express from 'express';
import feedService from '../service/feed.service';
import feedMarkerService from '../service/feed-marker.service';

const feedRouter = express.Router();

feedRouter.get('/api/feeds/:limit', async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const feeds = await feedService.getFeeds({
      userId,
      limit: req.params.limit,
      offset: req.query.offset, 
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
    await feedMarkerService.markFeedFavorite({userId, feedId});
    res.status(200).send();
  } catch (error) {
    next(error);
  } 
});

export { feedRouter };
