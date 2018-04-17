import * as webpush from 'web-push';
import { checkHasVapidKey, saveVapidKey, getVapidKey } from './dao';
import { logger } from './logger';

export const startWebPush = async () => {
  if (!await checkHasVapidKey()) {
    const newVapidKeys: VapidKeys = webpush.generateVAPIDKeys();
    await saveVapidKey(newVapidKeys);
    logger.info(`generate new vapid key [public key: ${newVapidKeys.publicKey}]`);
  }
  const vapidKeys = await getVapidKey();

  webpush.setVapidDetails('mailto:octopus@octopus.com', vapidKeys.publicKey, vapidKeys.privateKey);
};
