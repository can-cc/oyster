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
    const sources: FeedSource[] = await getRepository(FeedSource).find({
      where: {
        isDeleted: 'FALSE'
      }
    });
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
    try {
      await getRepository(FeedSource).update(id, {
        isDeleted: true
      });
      await this.refreshFeedSource();
      return 'OK';
    } catch (error) {
      throw error;
    }
  }
}

export default new FeedSourceService();
