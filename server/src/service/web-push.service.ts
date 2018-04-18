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

  public addSubscription(subscription: WebPushSubscription): void {
    this.subscribers.push(subscription);
    saveWebpushSubscription(subscription);
    logger.info(`add new subscription which endpoint is ${subscription.endpoint}`);
  }

  private async loadSubscribes(): Promise<void> {
    this.subscribers = (await getWebpushSubscribers()).map((serialization: string) => {
      return JSON.parse(serialization);
    });
  }
}

export default new WebPushService();
