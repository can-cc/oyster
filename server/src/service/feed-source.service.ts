import { FeedSource } from '../entity/FeedSource';
import { getRepository } from 'typeorm';
import { Observable, BehaviorSubject } from 'rxjs';

class FeedSourceService {
  private sources: FeedSource[];
  private source$: BehaviorSubject<FeedSource[]> = new BehaviorSubject([]);

  constructor() {
    this.source$.subscribe((sources: FeedSource[]) => {
      this.sources = sources;
    });
  }

  public async refreshFeedSource(): Promise<void> {
    const sources: FeedSource[] = await getRepository(FeedSource).find();
    this.source$.next(sources);
  }

  public getFeedSources(): FeedSource[] {
    return this.sources;
  }

  public getFeedSources$(): Observable<FeedSource[]> {
    return this.source$.asObservable();
  }

  public async saveFeedSource({ name, url }): Promise<FeedSource> {
    const feedSource = new FeedSource({ name, url });
    const savedFeedSource: FeedSource = await getRepository(FeedSource).save(feedSource);
    await this.refreshFeedSource();
    return savedFeedSource;
  }

  public async removeFeedSource({ id }): Promise<string> {
    const feedSource = new FeedSource();
    feedSource.id = id;
    try {
      await getRepository(FeedSource).remove(feedSource);
      return 'OK';
    } catch (error) {
      throw error;
    }
  }
}

export default new FeedSourceService();
