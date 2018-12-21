import { knex } from './db';
import { QueryBuilder } from 'knex';
import { logger } from './logger';

export const saveUser = async (username: string, hash: string): Promise<QueryBuilder | void> => {
  return knex('user').insert({
    username,
    hash,
    created_at: new Date().getTime(),
    updated_at: new Date().getTime()
  });
};

export const isFeedExist = async (feed: Feed): Promise<boolean> => {
  const cols = await knex('atom').where({ title: feed.title });
  return !!cols.length;
};

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
