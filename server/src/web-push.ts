import * as webpush from 'web-push';
import { checkHasVapidKey, saveVapidKey, getVapidKey } from './dao';
import { logger } from './logger';

export const setupWebPush = async () => {
  if (!await checkHasVapidKey()) {
    const newVapidKeys: VapidKeys = webpush.generateVAPIDKeys();
    await saveVapidKey(newVapidKeys);
    logger.info(`generate new vapid key [public key: ${newVapidKeys.publicKey}]`);
  }
  const vapidKeys = await getVapidKey();

  // NOTE replace the email
  webpush.setVapidDetails('mailto:octopus@octopus.com', vapidKeys.publicKey, vapidKeys.privateKey);
};

export const sendNotification = (subscription: WebPushSubscription, params: any): Promise<void> => {
  return webpush.sendNotification(subscription, JSON.stringify(params));
};
