import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as htmlToText from 'html-to-text';
import { saveFeed, getVapidKey, isFeedExist } from '../dao';
import { fetchFeedSources } from '../fetcher';
import configure from '../configure';
import * as redis from 'redis';
import * as bloom from 'bloom-redis';

import { sendNotification } from '../web-push';
import { logger } from '../logger';

import webPushService from '../service/web-push.service';

const feedsFile = path.resolve(__dirname, '../../..', configure.getConfig('FEED_FILE_PATH'));

function getFeedSetting() {
  const feeds = yaml.safeLoad(fs.readFileSync(feedsFile, 'utf8'));
  return feeds;
}

class FeedFetcher {
  private filter: bloom.BloomFilter;

  constructor() {
    const client = redis.createClient({
      host: configure.getConfig('REDIS_HOST'),
      port: configure.getConfig('REDIS_POST')
    });
    bloom.connect(client);
    this.filter = new bloom.BloomFilter({ key: 'mykey' });
  }

  public pollFetch() {
    const feedSetting: FeedSetting = getFeedSetting();
    try {
      fetchFeedSources(feedSetting, async (feeds: any[]) => {
        await Promise.all(
          feeds.map(
            async (feed: Feed): Promise<void> => {
              if (!(await isFeedExist(feed))) {
                await saveFeed(feed);
                await Promise.all(
                  webPushService.getSubscribers().map(
                    (subscription: WebPushSubscription): Promise<void> => {
                      const content = htmlToText.fromString(feed.content, {
                        ignoreImage: true,
                        ignoreHref: true,
                        wordwrap: false
                      });
                      return sendNotification(subscription, {
                        title: feed.title,
                        content,
                        link: feed.link
                      });
                    }
                  )
                );
              }
            }
          )
        );
      });
    } catch (error) {
      logger.error(error);
    }
  }

  private markFeedExist(): void {
    this.filter.add();
  }

  private isFeedExist() {}
}
export default new FeedFetcher();
