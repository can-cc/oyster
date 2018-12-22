import * as webpush from 'web-push';
import * as htmlToText from 'html-to-text';
import { getWebpushSubscribers, saveWebpushSubscription } from '../dao';
import { logger } from '../logger';
import { Feed } from '../entity/Feed';
import { WebPushNotification } from '../typing/notification';

class WebPushService {
  private subscribers: WebPushSubscription[] = [];

  constructor() {
    this.loadSubscribes();
  }

  public getSubscribers(): WebPushSubscription[] {
    return this.subscribers;
  }

  public addSubscription(subscription: WebPushSubscription, useragent: string): void {
    this.subscribers.push(subscription);
    saveWebpushSubscription(subscription, useragent);
    logger.info(`add new subscription which endpoint is ${subscription.endpoint}`);
  }

  public noticeNewFeed(feed: Feed): Promise<void[]> {
    return Promise.all(
      this.getSubscribers().map(
        (subscription: WebPushSubscription): Promise<void> => {
          const content = htmlToText.fromString(feed.content, {
            ignoreImage: true,
            ignoreHref: true,
            wordwrap: false
          });
          return this.sendNotification(subscription, {
            title: feed.title,
            content,
            link: feed.originHref
          });
        }
      )
    );
  }

  public sendNotification(subscription: WebPushSubscription, params: WebPushNotification): Promise<void> {
    return webpush.sendNotification(subscription, JSON.stringify(params)).catch(error => {
      logger.log('[!IMPORTANT] push to FCM error');
      logger.error(error);
      throw error;
    });
  }

  private async loadSubscribes(): Promise<void> {
    try {
      this.subscribers = this.subscribers.concat(
        (await getWebpushSubscribers())
          .map(col => col.serialization)
          .map((serialization: string) => {
            return JSON.parse(serialization);
          })
      );
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new WebPushService();
