import * as express from 'express';
import * as htmlToText from 'html-to-text';
import webPushService from 'src/service/web-push.service';

const pignRouter = express.Router();

pignRouter.post('/api/webpush/ping', async (req, res) => {
  try {
    const { msg }: { msg: string } = req.body;
    const content = htmlToText.fromString(msg);
    const params = {
      title: 'Pong!',
      content,
      link: ''
    };
    await Promise.all(
      webPushService.getSubscribers().map(subscription => {
        return webPushService.sendNotification(subscription, params);
      })
    );
    res.status(204).send();
  } catch (error) {
    throw error;
  }
});


export { pignRouter };
