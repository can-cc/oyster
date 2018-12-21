import { FeedSource } from '../entity/FeedSource';
import { getRepository } from 'typeorm';

class FeedSourceService {
  private source: FeedSource[];

  constructor() {
    this.refreshFeedSource().then();
  }

  public async refreshFeedSource(): Promise<void> {
    this.source = await getRepository(FeedSource).find();
  }

  public getFeedSource(): FeedSource[] {
    return this.source;
  }
}

export default new FeedSourceService();