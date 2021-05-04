import * as express from 'express';
import feedSourceService from '../service/feed-source.service';

const feedSourceFaviconRouter = express.Router();

feedSourceFaviconRouter.get('/feed-source/:sourceID/favicon', async (req, res, next) => {
  try {
    const favicon = await feedSourceService.getFeedSourceFavicon(req.params.sourceID);
    feedSourceService;
    return res.status(200).header('Cache-Control', 'public,max-age=86400').send(favicon);
  } catch (error) {
    next(error);
  }
});

export { feedSourceFaviconRouter };
