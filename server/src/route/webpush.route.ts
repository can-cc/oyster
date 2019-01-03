import * as express from 'express';
import webPushService from '../service/web-push.service';
import webpushSubscriberService from '../service/webpush-subscriber.service';

const webpushRouter = express.Router();

webpushRouter.get('/api/client/config', async (req, res) => {
  try {
    const vapidPublicKey: string = (await webPushService.getVapidKey()).publicKey;
    res.json({ vapidPublicKey });
  } catch (error) {
    throw error;
  }
});

webpushRouter.post('/api/webpush/subscribe', (req, res) => {
  try {
    const subscription: WebPushSubscription = req.body.subscription;
    const userAgent: string = req.useragent.source;
    webpushSubscriberService.saveWebpushSubscriber(subscription, userAgent);
    res.status(204).send();
  } catch (error) {
    throw error;
  }
});

export { webpushRouter };
