import { getRepository } from 'typeorm';
import { WebpushSubscriber } from '../entity/webpush-subscriber';
import { Subject } from 'rxjs';

class WebpushSubscriberService {
  private subscribers: WebpushSubscriber[] = [];
  private subscribers$: Subject<WebpushSubscriber[]> = new Subject();

  constructor() {
    this.subscribers$.subscribe(subsribers => (this.subscribers = subsribers));
  }

  public async saveWebpushSubscriber(subscription: WebPushSubscription, useragent: string): Promise<void> {
    const webpushSubscriber: WebpushSubscriber = new WebpushSubscriber();
    webpushSubscriber.serialization = JSON.stringify(subscription);
    webpushSubscriber.useragent = useragent;
    await getRepository(WebpushSubscriber).save(webpushSubscriber);
    await this.refreshSubsribers();
  }

  public async findWebpushSubscribers(): Promise<WebpushSubscriber[]> {
    return await getRepository(WebpushSubscriber).find();
  }

  public getWebpushSubscribers(): WebpushSubscriber[] {
    return this.subscribers;
  }

  public async refreshSubsribers() {
    this.subscribers$.next(await this.findWebpushSubscribers());
  }

  public async removeSubscribers(webpushScubscriber: WebpushSubscriber) {
    await getRepository(WebpushSubscriber).remove(webpushScubscriber);
    await this.refreshSubsribers();
  }
}

export default new WebpushSubscriberService();
