import { FeedSource } from '../entity/FeedSource';
import { getRepository } from 'typeorm';

class FeedSourceService {
  private source: FeedSource[];

  // constructor() {}

  public async refreshFeedSource(): Promise<void> {
    this.source = await getRepository(FeedSource).find();
  }

  public getFeedSource(): FeedSource[] {
    return this.source;
  }

  public async getFeedSources(): Promise<FeedSource[]> {
    return await getRepository(FeedSource).find();
  }

  public async saveFeedSource({ name, url }): Promise<FeedSource> {
    const feedSource = new FeedSource({ name, url });
    const savedFeedSource: FeedSource = await getRepository(FeedSource).save(feedSource);
    return savedFeedSource;
  }
}

export default new FeedSourceService();