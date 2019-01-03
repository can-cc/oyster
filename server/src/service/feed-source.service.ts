import { FeedSource } from '../entity/FeedSource';
import { getRepository } from 'typeorm';
import { Subject } from 'rxjs';

class FeedSourceService {
  private sources: FeedSource[];
  private source$ = new Subject();

  constructor() {
    this.source$.subscribe((source: FeedSource[]) => {
      this.sources = source;
    });
  }

  public async refreshFeedSource(): Promise<void> {
    const sources: FeedSource[] = await getRepository(FeedSource).find();
    this.source$.next(sources);
  }

  public getFeedSources(): FeedSource[] {
    return this.sources;
  }

  public async saveFeedSource({ name, url }): Promise<FeedSource> {
    const feedSource = new FeedSource({ name, url });
    const savedFeedSource: FeedSource = await getRepository(FeedSource).save(feedSource);
    await this.refreshFeedSource();
    return savedFeedSource;
  }
}

export default new FeedSourceService();
