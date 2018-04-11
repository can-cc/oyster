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
