import configure from '../configure';
import * as redis from 'redis';
import * as bloom from 'bloom-redis';
import { logger } from '../logger';
import webPushService from '../service/web-push.service';
import feedService from './feed.service';
import { FeedSource } from '../entity/feed-source';
import { Feed } from '../entity/feed';
import feedSourceService from './feed-source.service';
import * as fetch from 'isomorphic-fetch';
import { Observable } from 'rxjs';
import { parseFeedData } from '../util/parser';
import { FeedData, FeedResult } from '../typing/feed';
var cron = require('node-cron');

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
    let sources: FeedSource[];
    const feedSources$: Observable<FeedSource[]> = feedSourceService.getFeedSources$();
    feedSources$.subscribe(s => {
      sources = s;
    });

    cron.schedule(configure.getConfig('fetch_cron'), async () => {
      const fetchResults: FeedResult[] = await Promise.all(
        sources.map(async (source: FeedSource) => {
          logger.info(`fetch source`, {
            sourceName: source.name,
            time: new Date()
          });
          logger.info(`fetching source [url] = ${source.url}`);
          const feedRawData = await (await fetch(source.url)).text();
          return { source, feedRawData };
        })
      );

      fetchResults.forEach(async (fetchResult: FeedResult) => {
        const feeds: FeedData[] = (await parseFeedData(fetchResult.feedRawData)).map(f => ({
          ...f,
          source: fetchResult.source
        }));
        feeds.forEach(async (feedData: FeedData) => {
          const feed: Feed = new Feed(feedData);
          if (await this.isFeedExist(feed)) {
            return;
          }
          await this.handleParsedFeedData(feed);
          logger.info(`feed saved`, {
            id: feed.id,
            title: feed.title,
            sourceName: feedData.source.name,
            time: new Date()
          });
        });
      });
    });
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
