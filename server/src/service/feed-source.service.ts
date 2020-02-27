import { FeedSource } from '../entity/feed-source';
import { getRepository } from 'typeorm';
import { Observable, BehaviorSubject } from 'rxjs';
import faviconGrabberService from './favicon-grabber.service';
const psl = require('psl');


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

  public  getFeedSources(): FeedSource[] {
    return this.sources;
  }

  public async getFeedSourceFavicon(id): Promise<any> {
    return (await getRepository(FeedSource).findOne(id)).favicon;
  }

  public getFeedSources$(): Observable<FeedSource[]> {
    return this.source$.asObservable();
  }

  public async saveFeedSource({ name, url }): Promise<FeedSource> {
    const favicon =   await faviconGrabberService.getFavicon(url);
    const feedSource = new FeedSource({ name, url, favicon });
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
