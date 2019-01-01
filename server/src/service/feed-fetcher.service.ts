import configure from '../configure';
import * as redis from 'redis';
import * as bloom from 'bloom-redis';
import { logger } from '../logger';
import webPushService from '../service/web-push.service';
import feedService from './feed.service';
import { FeedSource } from '../entity/FeedSource';
import { Feed } from '../entity/Feed';
import feedSourceService from './feed-source.service';
import * as fetch from 'isomorphic-fetch';
import { startWith, switchMap, mergeMap, catchError, concatMap, ignoreElements } from 'rxjs/operators';
import { Observable, interval, of, empty } from 'rxjs';
import { parseFeed } from '../util/parser';
import { FeedData, FeedResult } from '../typing/feed';

function loop(sources: FeedSource[], intervalValue: number = 5 * 60 * 1000): Observable<FeedResult> {
  return interval(intervalValue).pipe(
    startWith(0),
    switchMap(() =>
      of(...sources).pipe(
        concatMap(s => {
          return of(s).pipe(
            mergeMap(async source => {
              logger.info(`fetch ${source.name}`);
              const feedRawData = await (await fetch(source.url)).text();
              return { source, feedRawData };
            }),
            catchError((error, caught) => {
              logger.error(`fetch failure : ${error.message}`);
              return empty().pipe(ignoreElements());
            })
          );
        })
      )
    )
  );
}

function fetchFeedSources(feedSources: FeedSource[]): Observable<FeedData[]> {
  return Observable.create(observer => {
    const feed$ = loop(feedSources);
    const subscription = feed$.subscribe(async (result: FeedResult) => {
      try {
        const feedDatas: FeedData[] = await parseFeed(result.feedRawData).map(f => ({ ...f, source: result.source }));
        observer.next(feedDatas);
      } catch (error) {
        logger.error(`parse and save feed error. ${error}`);
      }
    });
    return () => subscription.unsubscribe();
  });
}

class FeedFetcher {
  private filter: bloom.BloomFilter;

  constructor() {
    const client = redis.createClient({
      host: configure.getConfig('REDIS_HOST'),
      port: configure.getConfig('REDIS_POST')
    });
    bloom.connect(client);
    this.filter = new bloom.BloomFilter({ key: 'feed-exist' });
  }

  public async pollFetch() {
    await feedSourceService.refreshFeedSource();
    const feedSources: FeedSource[] = feedSourceService.getFeedSource();
    try {
      fetchFeedSources(feedSources).subscribe(async (feedDatas: FeedData[]) => {
        await Promise.all(
          feedDatas.map(
            async (feedData: FeedData): Promise<void> => {
              const feed: Feed = new Feed(feedData);
              if (!(await this.isFeedExist(feed))) {
                await this.handleParsedFeedData(feed);
              }
            }
          )
        );
      });
    } catch (error) {
      logger.error(error);
    }
  }

  private async handleParsedFeedData(feed: Feed): Promise<void> {
    await feedService.saveFeed(feed);
    await this.markFeedExist(feed);
    webPushService.noticeNewFeed(feed).then();
  }

  private markFeedExist(feed: Feed): Promise<void> {
    return new Promise((resolve, reject) => {
      this.filter.add(this.genFeedIdentifyStr(feed), () => {
        resolve();
      });
    });
  }

  private isFeedExist(feed: Feed): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.filter.contains(this.genFeedIdentifyStr(feed), (error, isContain: boolean) => {
        if (error) {
          return reject(error);
        }
        return resolve(isContain);
      });
    });
  }

  private genFeedIdentifyStr(feed: Feed): string {
    return feed.title + feed.content;
  }
}
export default new FeedFetcher();
