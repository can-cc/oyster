import { knex } from './db';

export const insertToAtom = async data => {
  const exist = await knex('atom').where({ title: data.title });
  if (exist.length) {
    return Promise.resolve();
  }
  return knex('atom').insert({
    ...data
  });
};

export const makeAtomRead = id => {
  return knex('atom')
    .where({ id })
    .update({
      isRead: true
    });
};

export const getAtoms = async (count: number) => {
  return knex('atom')
    .where({ isRead: null })
    .select('*')
    .limit(count)
    .orderBy('created_at', 'desc');
};
