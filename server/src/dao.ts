import { knex } from './db';
import { QueryBuilder } from 'knex';
import { logger } from './logger';

export const checkHasVapidKey = async (): Promise<boolean> => {
  const cols = await knex('vapidKey').select('*');
  return !!cols.length;
};

export const saveVapidKey = async (data: VapidKeys): Promise<void> => {
  return await knex('vapidkey').insert(data);
};

export const getVapidKey = async (): Promise<VapidKeys> => {
  return (await knex('vapidkey').select('*'))[0];
};

export const saveWebpushSubscription = async (
  subscription: WebPushSubscription,
  useragent: string
): Promise<void> => {
  logger.info(`saving webpush subscription [useragent] ${useragent}`);
  return await knex('webpush_subscribers').insert({
    serialization: JSON.stringify(subscription),
    useragent
  });
};

export const getWebpushSubscribers = async (): Promise<QueryBuilder> => {
  return await knex('webpush_subscribers').select('*');
};
