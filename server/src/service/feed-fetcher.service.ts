import * as path from 'path';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as htmlToText from 'html-to-text';
import { getAtoms, saveFeed, getVapidKey, isFeedExist } from '../dao';
import { fetchFeedSources } from '../fetcher';
import configure from '../configure';

import { setupWebPush, sendNotification } from '../web-push';
import { logger } from '../logger';

import webPushService from '../service/web-push.service';
import { authMiddle } from '../route/middle/auth.middle';

const feedsFile = path.resolve(__dirname, '../../..', configure.getConfig('FEED_FILE_PATH'));

function getFeedSetting() {
  const feeds = yaml.safeLoad(fs.readFileSync(feedsFile, 'utf8'));
  return feeds;
}

class FeedFetcher {
  // constructor() {}

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
}
export default new FeedFetcher();
