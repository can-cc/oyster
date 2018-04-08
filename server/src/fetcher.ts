import loop from './loop';
import md5 from 'md5';
import xml2js from 'xml2js';
import { parseFeed } from 'feed-parse-lib';

const loop = sources => {
  const hashMap = new Map();
  return Observable.interval(60000).mergeMap(() =>
    Observable.of(...sources)
      .concatMap(async source => {
        const feedRawData = await (await fetch(source.url)).text();
        return { ...source, feedRawData };
      }).filter(feed => {
        const hash = md5(feed.feedRawData);
        if (hashMap[feed.url] === hash) {
          return false;
        }
        hashMap[feed.url] = hash;
        return true;
      }).catch(error => {
        console.error(`fetch failure : ${error.message}`); // TODO 如何向外抛出错误
        return Observable.of(null);
      })
  );
};


export const fetchFeedSources = (feeds, listenFn) => {
  const feedObservable = loop(feeds);
  feedObservable.subscribe(async feed => {
    try {
      if (!feed) {
        return;
      }
      const parsedFeed = await parseFeed(feed.feedRawData);
      return listenFn(null, parsedFeed);
    } catch (error) {
      return listenFn(error);
    }
  });
  return () => subscription.unsubscribe(); // TODO: next complete
};
