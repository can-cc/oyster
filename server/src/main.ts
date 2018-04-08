import startFetchFeed from 'feedjs';
import express from 'express';
import path from 'path';
import { getAtoms, createTablesIfNotExsits, insertToAtom, makeAtomRead } from './db';
import colors from 'colors';
import fs from 'fs';

const feedsFilePath = path.join(process.env.HOME, '.feeds');

function checkFeedFileExist() {
  if (!fs.existsSync(feedsFilePath)) {
    console.log('check your `~/.feeds` file');
    process.exit();
  }
}

function getFeeds() {
  return JSON.parse(fs.readFileSync(feedsFilePath, 'utf8'));
}

async function main() {
  checkFeedFileExist();
  await createTablesIfNotExsits();

  const feedSources = getFeeds();
  startFetchFeed(feedSources, async (error, feeds) => {
    if (error) {
      console.error(error);
    } else {
      await Promise.all(feeds.map(insertToAtom));
    }
  });

  const app = express();

  app.get('/alive', (req, res) => {
    res.send('I am alive');
  });

  app.get('/new-unread/:number', async (req, res) => {
    const atoms = await getAtoms(req.params.number);
    res.json(atoms.reverse());
  });

  app.post('/unread/:id', async (req, res) => {
    await makeAtomRead(req.params.id);
    res.send('ok'); // NOTE: 操他妈的，一定要返回点东西emacs那个狗逼web插件才能把进程关掉，调死爸爸了
  });

  app.listen(7788);
  console.log(colors.green(`server start at http://127.0.0.1:7788`));
}

main();
