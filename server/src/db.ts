import * as R from 'ramda';
import * as path from 'path';
import * as sqlite3 from 'sqlite3';
import * as md5 from 'md5';

export const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: path.join(__dirname, '../../db.sqlite3') },
  useNullAsDefault: true
});

const createAtomTable = knex.schema.createTableIfNotExists('atom', table => {
  table.increments();
  table.string('title');
  table.string('source');
  table.string('link');
  table.string('content');
  table.string('published');
  table.string('author');
  table.boolean('isRead');
});

export const createTablesIfNotExsits = async () => {
  return await Promise.all([createAtomTable]).then();
};
