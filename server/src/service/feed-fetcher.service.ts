import configure from '../configure';
import * as redis from 'redis';
import * as bloom from 'bloom-redis';
import { logger, fetchLogger } from '../logger';
import webPushService from '../service/web-push.service';
import feedService from './feed.service';
import { FeedSource } from '../entity/feed-source';
import { Feed } from '../entity/feed';
import feedSourceService from './feed-source.service';
import * as fetch from 'isomorphic-fetch';
import { startWith, switchMap, mergeMap, catchError, concatMap, ignoreElements, tap } from 'rxjs/operators';
import { Observable, interval, of, empty, Observer } from 'rxjs';
import { parseFeedData } from '../util/parser';
import { FeedData, FeedResult } from '../typing/feed';

function loop(sources: FeedSource[], intervalValue: number = 5 * 60 * 1000): Observable<FeedResult> {
  return interval(intervalValue).pipe(
    startWith(0),
    concatMap(() =>
      of(...sources).pipe(
        concatMap(s => {
          return of(s).pipe(
            mergeMap(async source => {
              fetchLogger.info(`fetch source`, {
                sourceName: source.name,
                time: new Date()
              });
              fetchLogger.info(`fetching source [url] = ${source.url}`);
              const feedRawData = await (await fetch(source.url)).text();
              return { source, feedRawData };
            }),
            catchError((error, caught) => {
              fetchLogger.error(`fetch failure in interval : ${error}`);
              return empty();
            })
          );
        })
      )
    ),
    catchError((value) => {
      console.log('Fetch source error in cancat', value);
      return empty();
    })
  );
}

function fetchFeedSources(feedSources: FeedSource[]): Observable<FeedData[]> {
  return Observable.create((observer: Observer<FeedData[]>) => {
    const feed$ = loop(feedSources);
    const subscription = feed$.subscribe(async (result: FeedResult) => {
      try {
        const feedDatas: FeedData[] = (await parseFeedData(result.feedRawData)).map(f => ({ ...f, source: result.source }));
        observer.next(feedDatas);
      } catch (error) {
        fetchLogger.error(`parse and save feed error. ${error}`);
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
    const feedSources$: Observable<FeedSource[]> = feedSourceService.getFeedSources$();
    try {
      feedSources$.pipe(switchMap(fetchFeedSources)).subscribe(async (feedDatas: FeedData[]) => {
        await Promise.all(
          feedDatas.map(
            async (feedData: FeedData): Promise<void> => {
              const feed: Feed = new Feed(feedData);
              if (!(await this.isFeedExist(feed))) {
                await this.handleParsedFeedData(feed);
                fetchLogger.info(`feed saved`, {
                  id: feed.id,
                  title: feed.title,
                  sourceName: feedData.source.name,
                  time: new Date()
                });
              }
            }
          )
        );
      });
    } catch (error) {
      fetchLogger.error(error);
    }
  }

  private async handleParsedFeedData(feed: Feed): Promise<void> {
    await this.markFeedExist(feed);
    await feedService.saveFeed(feed);
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
    if (feed.id) {
      return feed.id;
    }
    return feed.source.name + feed.title + feed.content;
  }
}
export default new FeedFetcher();
