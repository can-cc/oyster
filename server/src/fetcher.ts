import * as fetch from 'isomorphic-fetch';
import * as Rx from 'rxjs';
import { parseFeed } from './util/parser';
import { logger } from './logger';
import { FeedSource } from './entity/FeedSource';

const loop = (sources: FeedSource[], interval: number = 5 * 60 * 1000): Rx.Observable<{} | FeedResult> => {
  return Rx.Observable.interval(interval)
    .startWith(0)
    .switchMap(() =>
      Rx.Observable.of(...sources).concatMap(s => {
        return Rx.Observable.of(s)
          .mergeMap(async source => {
            logger.info(`fetch ${source.name}`);
            const feedRawData = await (await fetch(source.url)).text();
            return { ...source, feedRawData };
          })
          .catch((error, caught) => {
            logger.error(`fetch failure : ${error.message}`);
            return Rx.Observable.empty().ignoreElements();
          });
      })
    );
};

export const fetchFeedSources = (
  feedSources: FeedSource[],
  handleFeeds: (feeds: any[]) => void
): (() => void) => {
  const feed$ = loop(feedSources);
  const subscription = feed$.subscribe(
    async (result: { label: string; url: string; feedRawData: string }) => {
      try {
        const feeds = await parseFeed(result.feedRawData);
        logger.info(`parse "${result.label} feed raw data susscess"; lenght = ${feeds.length}`);
        return handleFeeds(feeds.map(feed => ({ ...feed, source: result.label })));
      } catch (error) {
        logger.error(`parse and save feed error. ${error}`);
      }
    }
  );
  return () => subscription.unsubscribe();
};
