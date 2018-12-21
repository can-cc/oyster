
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
import * as Rx from 'rxjs';
import { parseFeed } from '../util/parser';

const loop = (sources: FeedSource[], interval: number = 5 * 60 * 1000): Rx.Observable<{} | FeedResult> => {
  return Rx.Observable.interval(interval)
    .startWith(0)
    .switchMap(() =>
      Rx.Observable.of(...sources).concatMap(s => {
        return Rx.Observable.of(s)
          .mergeMap(async source => {
            logger.info(`fetch ${source.name}`);
            const feedRawData = await (await fetch(source.url)).text();
            return { ...source, feedRawData };
          })
          .catch((error, caught) => {
            logger.error(`fetch failure : ${error.message}`);
            return Rx.Observable.empty().ignoreElements();
          });
      })
    );
};

const fetchFeedSources = (
  feedSources: FeedSource[],
  handleFeeds: (feeds: Feed[]) => void
): (() => void) => {
  const feed$ = loop(feedSources);
  const subscription = feed$.subscribe(
    async (result: { label: string; url: string; feedRawData: string }) => {
      try {
        const feeds = await parseFeed(result.feedRawData);
        logger.info(`parse "${result.label} feed raw data susscess"; lenght = ${feeds.length}`);
        return handleFeeds(feeds.map(feed => ({ ...feed, source: result.label })));
      } catch (error) {
        logger.error(`parse and save feed error. ${error}`);
      }
    }
  );
  return () => subscription.unsubscribe();
};


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

  public pollFetch() {
    const feedSources: FeedSource[] = feedSourceService.getFeedSource();
    try {
      fetchFeedSources(feedSources, async (feeds: any[]) => {
        await Promise.all(
          feeds.map(
            async (feedData): Promise<void> => {
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
