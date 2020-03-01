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
        return {  globalID: rssId, title, originHref, content, publishedDate: published, author };
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
        return { globalID: entry.id[0], title, originHref, content, publishedDate: published, author };
      } catch (error) {
        return null;
      }
    }
  );
};

const parseRSS2 = (entrys: any[], parsedObject: any): FeedData[] =>
  entrys.map(
    (entry: any): FeedData => {
      const title = entry.title[0];
      const originHref = entry.link[0];
      const content = entry.description[0];
      const published = entry.pubDate[0] ? moment.utc(entry.pubDate[0].replace('  ', ' ')).toDate() : null;
      let author: string;
      if (R.path(['rss', '$', 'xmlns:dc'], parsedObject) === 'http://purl.org/dc/elements/1.1/') {
        author = R.path(['dc:creator', 0], entry);
      } else {
        author = R.path(['author', 0], entry);
      }
      const guid = R.path(['guid', 0, '_'], entry);
      return { title, originHref, content, publishedDate: published, author, globalID: guid };
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
  const parsedObject: any = await new Promise((resolve, reject) => {
    parseString(rawData, function(err, result) {
      if (err) {
        return reject(rawData);
      }
      return resolve(result);
    });
  });

  switch (checkFeedStandard(parsedObject)) {
    case 'RSS2':
      return R.flatten(parseRSS2(parsedObject.rss.channel[0].item, parsedObject));
    case 'YAHOO_FEED':
      return R.flatten(parseYahaooVersionFeed(parsedObject.feed.entry, parsedObject.feed)).filter(_ => !!_);
    case 'FEED':
        return R.flatten(parseFeed(parsedObject.feed.entry, parsedObject.feed)).filter(_ => !!_);
    default:
      return [];
  }
}
