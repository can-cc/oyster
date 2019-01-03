import * as htmlToText from 'html-to-text';
import { logger } from '../logger';
import { Feed } from '../entity/Feed';
import { WebPushNotification } from '../typing/notification';
import configure from '../configure';
import * as webpush from 'web-push';
import { getRepository } from 'typeorm';
import { VapidKey } from '../entity/VapidKey';
import webpushSubscriberService from './webpush-subscriber.service';
import { WebpushSubscriber } from 'src/entity/WebpushSubscriber';

class WebPushService {
  // constructor() {}

  public async setup() {
    await webpushSubscriberService.refreshSubsribers();

    if (!(await this.checkHasVapidKey())) {
      const newVapidKeys: VapidKeys = webpush.generateVAPIDKeys();
      await this.saveVapidKey(newVapidKeys);
      logger.info(`generate new vapid key [public key: ${newVapidKeys.publicKey}]`);
    }
    const vapidKey: VapidKey = await this.getVapidKey();
    const vapidDetailEmail: string = configure.getConfig('VAPID_DETAIL_EMAIL');
    if (!vapidDetailEmail) {
      throw new Error('VAPID_DETAIL_EMAIL not found');
    }
    webpush.setVapidDetails(`mailto:${vapidDetailEmail}`, vapidKey.publicKey, vapidKey.privateKey);
  }

  public async checkHasVapidKey(): Promise<boolean> {
    return await getRepository(VapidKey)
      .count()
      .then(count => count > 0);
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

  public noticeNewFeed(feed: Feed): Promise<void[]> {
    return Promise.all(
      webpushSubscriberService.getWebpushSubscribers().map(
        (subscriber: WebpushSubscriber): Promise<void> => {
          const stringifyText: string = htmlToText.fromString(feed.content, {
            ignoreImage: true,
            ignoreHref: true,
            wordwrap: false
          });
          const content = stringifyText.length > 200 ? stringifyText.slice(0, 200) + '...' : stringifyText;
          return this.sendNotification(subscriber, {
            title: feed.title,
            content,
            link: feed.originHref
          });
        }
      )
    );
  }

  // https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries
  public sendNotification(subscriber: WebpushSubscriber, params: WebPushNotification): Promise<void> {
    const subscription: WebPushSubscription = JSON.parse(subscriber.serialization);
    return webpush.sendNotification(subscription, JSON.stringify(params)).catch(error => {
      console.error('Push to FCM error');
      console.error(error);
      if (error.statusCode === 410) {
        webpushSubscriberService.removeSubscribers(subscriber);
      }
    });
  }
}

export default new WebPushService();
