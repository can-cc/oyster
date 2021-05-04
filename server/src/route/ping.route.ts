import * as express from 'express';
import webPushService from '../service/web-push.service';
import webpushSubscriberService from '../service/webpush-subscriber.service';
import { WebpushSubscriber } from '../entity/webpush-subscriber';

const pignRouter = express.Router();

pignRouter.post('/api/webpush/ping', async (req, res) => {
  try {
    const { msg }: { msg: string } = req.body;
    const content = msg;
    const params = {
      title: 'Pong!',
      content,
      link: '',
    };
    await Promise.all(
      webpushSubscriberService.getWebpushSubscribers().map((subscriber: WebpushSubscriber) => {
        return webPushService.sendNotification(subscriber, params);
      })
    );
    res.status(204).send();
  } catch (error) {
    throw error;
  }
});

export { pignRouter };
