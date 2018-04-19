import { getWebpushSubscribers, saveWebpushSubscription } from '../dao';
import { logger } from '../logger';

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
