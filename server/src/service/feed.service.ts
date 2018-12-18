import { getRepository } from 'typeorm';
import { FeedSource } from '../entity/FeedSource';

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
}

export default new FeedService();
