import { knex } from './db';
import { QueryBuilder } from 'knex';
import { logger } from './logger';

export const saveWebpushSubscription = async (subscription: WebPushSubscription, useragent: string): Promise<void> => {
  logger.info(`saving webpush subscription [useragent] ${useragent}`);
  return await knex('webpush_subscribers').insert({
    serialization: JSON.stringify(subscription),
    useragent
  });
};

export const getWebpushSubscribers = async (): Promise<QueryBuilder> => {
  return await knex('webpush_subscribers').select('*');
};
