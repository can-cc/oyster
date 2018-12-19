import { getRepository } from 'typeorm';
import { FeedSource } from '../entity/FeedSource';
import { Feed } from '../entity/Feed';

class FeedService {
  public async getFeeds(limit: number, offset: number): Promise<Feed[]> {
    return await getRepository(Feed)
      .createQueryBuilder()
      .orderBy('createdAt')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  public async getFeedSources(): Promise<FeedSource[]> {
    return await getRepository(FeedSource).find();
  }

  public async saveFeedSource({ name, url }): Promise<FeedSource> {
    const feedSource = new FeedSource({ name, url });
    const savedFeedSource: FeedSource = await getRepository(FeedSource).save(feedSource);
    return savedFeedSource;
  }

  public async saveFeed(feed: Feed): Promise<Feed> {
    const savedFeed: Feed = await getRepository(Feed).save(feed);
    return savedFeed;
  }
}

export default new FeedService();
