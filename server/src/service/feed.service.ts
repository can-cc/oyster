import { getRepository } from 'typeorm';
import { FeedSource } from '../entity/FeedSource';
import { Feed } from '../entity/Feed';

class FeedService {

  public async getFeedSources(): Promise<FeedSource[]> {
    return await getRepository(FeedSource).find();
  }

  public async saveFeedSource({ name, url }): Promise<FeedSource> {
    const feedSource = new FeedSource();
    feedSource.name = name;
    feedSource.url = url;
    const savedFeedSource: FeedSource = await getRepository(FeedSource).save(feedSource);
    return savedFeedSource;
  }

  public async saveFeed(feedData): Promise<Feed> {
    const feed = new Feed(feedData);
    const savedFeed: Feed = await getRepository(Feed).save(feed);
    return savedFeed;
  }
}

export default new FeedService();
