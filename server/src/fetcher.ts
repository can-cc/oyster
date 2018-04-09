import * as md5 from 'md5';
import * as xml2js from 'xml2js';
import * as fetch from 'isomorphic-fetch';

import { parseFeed } from './parser';
import * as Rx from 'rxjs';

const loop = sources => {
  const hashMap = new Map();
  return Rx.Observable.interval(1000).mergeMap(() =>
    Rx.Observable.of(...sources)
      .concatMap(async source => {
        const feedRawData = await (await fetch(source.url)).text();
        return { ...source, feedRawData };
      })
      .filter(feed => {
        const hash = md5(feed.feedRawData);
        if (hashMap[feed.url] === hash) {
          return false;
        }
        hashMap[feed.url] = hash;
        return true;
      })
      .catch(error => {
        console.error(`fetch failure : ${error.message}`); // TODO 如何向外抛出错误
        return Rx.Observable.of(null);
      })
  );
};

export const fetchFeedSources = (feeds, listenFn) => {
  const feedObservable = loop(feeds);
  const subscription = feedObservable.subscribe(async feed => {
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
