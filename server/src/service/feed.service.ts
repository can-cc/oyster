import { getRepository } from 'typeorm';
import { Feed } from '../entity/Feed';

class FeedService {
  public async getFeeds(limit: number, offset: number): Promise<Feed[]> {
    return await getRepository(Feed)
      .createQueryBuilder()
      .orderBy('"createdAt"')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  public async saveFeed(feed: Feed): Promise<Feed> {
    const savedFeed: Feed = await getRepository(Feed).save(feed);
    return savedFeed;
  }
}

export default new FeedService();
