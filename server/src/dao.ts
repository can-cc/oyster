import { knex } from './db';
import { QueryBuilder } from 'knex';
import { logger } from './logger';

export const saveFeed = async (feed: Feed): Promise<QueryBuilder | void> => {
  const exist = await knex('atom').where({ title: feed.title });
  if (exist.length) {
    return Promise.resolve();
  }
  logger.info(`saving feed.  title: ${feed.title}`);
  return knex('atom').insert({
    ...feed
  });
};

export const markFeedRead = id => {
  return knex('atom')
    .where({ id })
    .update({
      isRead: true
    });
};

export const getAtoms = async (limit: number, offset: number = 0): Promise<QueryBuilder> => {
  return knex('atom')
    .where({ isRead: null })
    .select('*')
    .limit(limit)
    .offset(offset)
    .orderBy('id', 'desc');
};

export const checkHasVapidKey = async (): Promise<boolean> => {
  const cols = await knex('vapidkey').select('*');
  return !!cols.length;
};

export const saveVapidKey = async (data: VapidKeys): Promise<void> => {
  return await knex('vapidkey').insert(data);
};

export const getVapidKey = async (): Promise<VapidKeys> => {
  return (await knex('vapidkey').select('*'))[0];
};

export const saveWebpushSubscriber = async (url: string): Promise<void> => {
  return await knex('webpush_subscribers').insert({ url });
};

export const getWebpushSubscribers = async (): Promise<QueryBuilder> => {
  return await knex('webpush_subscribers').select('*');
};
