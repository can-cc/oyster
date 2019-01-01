import * as htmlToText from 'html-to-text';
import { getWebpushSubscribers, saveWebpushSubscription } from '../dao';
import { logger } from '../logger';
import { Feed } from '../entity/Feed';
import { WebPushNotification } from '../typing/notification';
import configure from '../configure';
import * as webpush from 'web-push';
import { getRepository } from 'typeorm';
import { VapidKey } from '../entity/VapidKey';


class WebPushService {
  private subscribers: WebPushSubscription[] = [];

  constructor() {
    this.loadSubscribes();
  }

  public async setup() {
    if (!(await this.checkHasVapidKey())) {
      const newVapidKeys: VapidKeys = webpush.generateVAPIDKeys();
      await this.saveVapidKey(newVapidKeys);
      logger.info(`generate new vapid key [public key: ${newVapidKeys.publicKey}]`);
    }
    const vapidKey: VapidKey = await this.getVapidKey();
    webpush.setVapidDetails(`mailto:${configure.getConfig('VAPID_DETAIL_EMAIL')}`, vapidKey.publicKey, vapidKey.privateKey);
  };
  

  public async checkHasVapidKey(): Promise<boolean> {
    return await getRepository(VapidKey)
    .count().then(count => count > 0);
  }

  public async saveVapidKey(newVapidKeys: VapidKeys): Promise<void> {
    const vk: VapidKey = new VapidKey();
    vk.publicKey = newVapidKeys.publicKey;
    vk.privateKey = newVapidKeys.privateKey;
    await getRepository(VapidKey).save(vk);
  }

  public async getVapidKey(): Promise<VapidKey> {
    return getRepository(VapidKey).findOne();
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

  // https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries
  public sendNotification(subscription: WebPushSubscription, params: WebPushNotification): Promise<void> {
    return webpush.sendNotification(subscription, JSON.stringify(params)).catch(error => {
      console.error('[!IMPORTANT] push to FCM error');
      console.error(error);
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
