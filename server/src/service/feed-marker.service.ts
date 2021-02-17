import { getRepository } from 'typeorm';
import { FeedMark } from '../entity/feed-mark';
import authService from './auth.service';
import { User } from '../entity/app-user';
import { Feed } from '../entity/feed';
import feedService from './feed.service';

class FeedMarkerService {

  public async markFeedFavorite({ userId, feedId }): Promise<FeedMark> {
    const user: User = await authService.findUser(userId);
    const feed: Feed = await feedService.findFeed(feedId);
    const mark = new FeedMark({
      user,
      feed,
      type: 'FAVORITE'
    });
    return await getRepository(FeedMark).save(mark);
  }

  public async removeFeedFavoriteMark({ userId, feedId }): Promise<void> {
    const mark: FeedMark = await getRepository(FeedMark).findOne({
      where: {
        feedId: feedId,
        userId,
        type: 'FAVORITE'
      },
    });
    await getRepository(FeedMark).remove(mark);
  }
}

export default new FeedMarkerService();
