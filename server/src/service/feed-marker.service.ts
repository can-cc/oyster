import { getRepository } from 'typeorm';
import { FeedMark } from '../entity/FeedMark';
import authService from './auth.service';
import { User } from '../entity/User';
import { Feed } from '../entity/Feed';
import feedService from './feed.service';

class FeedMarkerService {
  constructor() {}

  public async markFeedFavorite({ userId, feedId }): Promise<void> {
    const user: User = await authService.findUser(userId);
    const feed: Feed = await feedService.findFeed(feedId);
    const mark = new FeedMark({
      user,
      feed,
      type: 'FAVORITE'
    });
    await getRepository(FeedMark).save(mark);
  }
}

export default new FeedMarkerService();
