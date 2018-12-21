import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { fetchFeedSources } from '../fetcher';
import configure from '../configure';
import * as redis from 'redis';
import * as bloom from 'bloom-redis';

import { logger } from '../logger';

import webPushService from '../service/web-push.service';
import { Feed } from '../entity/Feed';
import feedService from './feed.service';
import { FeedSource } from '../entity/FeedSource';
import feedSourceService from './feed-source.service';

const feedsFile = path.resolve(__dirname, '../../..', configure.getConfig('FEED_FILE_PATH'));

// function getFeedSetting() {
//   const feeds = yaml.safeLoad(fs.readFileSync(feedsFile, 'utf8'));
//   return feeds;
// }

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
