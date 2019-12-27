import * as moment from 'moment';
import * as R from 'ramda';
import { FeedData } from '../typing/feed';

var parseString = require('xml2js').parseString;

const parseFeed = (entrys: any[], feed): FeedData[] => {
  return entrys.map(
    (entry, index): FeedData => {
      try {
        const rssId = entry.id[0];
        const title = entry.title[0];
        const originHref = entry.link[0].$.href;
        const content = entry.content[0]._;
        const published = moment.utc(entry.updated[0]).toDate();
        const author = R.path(['author', 0, 'name', 0])(entry);
        return { id: rssId, title, originHref, content, publishedDate: published, author };
      } catch (error) {
        return null;
      }
    }
  );
};

const parseYahaooVersionFeed = (entrys: any[], feed): FeedData[] => {
  return entrys.map(
    (entry, index): FeedData => {
      try {
        const title = entry.title[0]._;
        const originHref = entry.link[0].$.href;
        const content = entry.content[0]._;
        const published = moment.utc(entry.published).toDate();
        const author = R.path(['author', 0, 'name', 0])(entry);
        return { id: entry.id[0], title, originHref, content, publishedDate: published, author };
      } catch (error) {
        return null;
      }
    }
  );
};

const parseRSS2 = (entrys: any[], channel: any): FeedData[] =>
  entrys.map(
    (entry: any): FeedData => {
      const title = entry.title[0];
      const originHref = entry.link[0];
      const content = entry.description[0];
      const published = entry.pubDate[0] ? moment(entry.pubDate[0]).toDate() : null;
      const author = entry.author[0];
      return { title, originHref, content, publishedDate: published, author };
    }
  );

const checkFeedStandard = (getParsedData: any): 'RSS2' | 'FEED' | 'YAHOO_FEED' | 'UNKNOWN' => {
  try {
    if (getParsedData.rss) {
      return 'RSS2';
    }
    if (getParsedData.feed.$['xmlns:media'] === 'http://search.yahoo.com/mrss/') {
      return 'YAHOO_FEED';
    }
    if (getParsedData.feed && getParsedData.feed.entry) {
      return 'FEED';
    }
  } catch (error) {
    return 'UNKNOWN';
  }
};

export async function parseFeedData(rawData: string): Promise<FeedData[]> {
  const getParsedData: any = await new Promise((resolve, reject) => {
    parseString(rawData, function(err, result) {
      if (err) {
        return reject(rawData);
      }
      return resolve(result);
    });
  });

  switch (checkFeedStandard(getParsedData)) {
    case 'RSS2':
      return R.flatten(parseRSS2(getParsedData.rss.channel[0].item, getParsedData.rss.channel[0]));
    case 'YAHOO_FEED':
      return R.flatten(parseYahaooVersionFeed(getParsedData.feed.entry, getParsedData.feed)).filter(_ => !!_);
    case 'FEED':
      return R.flatten(parseFeed(getParsedData.feed.entry, getParsedData.feed)).filter(_ => !!_);
    default:
      return [];
  }
}
