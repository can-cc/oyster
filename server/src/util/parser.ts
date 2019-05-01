import * as moment from 'moment';
import * as R from 'ramda';
import * as xml2json from 'xml2json';
import { FeedData } from '../typing/feed';
import { AdvancedConsoleLogger } from 'typeorm';

const parseFeed = (entrys: any[], feed): FeedData[] => {
  return entrys.map(
    (entry): FeedData => {
      const id = entry.id;
      const title = entry.title;
      const originHref = entry.link.href;
      const content = entry.content.$t;
      const published = moment(entry.published).toDate() || moment(entry.updated).toDate();
      const author = R.path(['author', 'name'])(entry) || R.path(['author', 'name'])(feed);
      return { id, title, originHref, content, publishedDate: published, author };
    }
  );
}

const parseYahaooFeed = (entrys: any[], feed): FeedData[] => {
  return entrys.map(
    (entry): FeedData => {
      const title = entry.title.$t;
      const originHref = entry.link.href;
      const content = entry.content.$t;
      const published = moment(entry.published).toDate() || moment(entry.updated).toDate();
      const author = R.path(['author', 'name'])(entry) || R.path(['author', 'name'])(feed);
      return { id: entry.id, title, originHref, content, publishedDate: published, author };
    }
  );
}
  
  

const parseRSS2 = (entrys: any[], channel: any): FeedData[] =>
  entrys.map(
    (entry: any): FeedData => {
      const title = entry.title;
      const originHref = entry.link;
      const content = entry.description;
      const published = moment(entry.pubDate).toDate();
      const author = entry.author || R.path(['dc:creator'])(entry);
      return { title, originHref, content, publishedDate: published, author };
    }
  );

const checkFeedStandard = (xml: any): 'RSS2' | 'FEED' | 'YAHOO_FEED' | 'UNKNOWN' => {
  if (xml.rss) {
    return 'RSS2';
  }
  if (xml.feed['xmlns:media'] === 'http://search.yahoo.com/mrss/') {
    return 'YAHOO_FEED';
  }
  if (xml.feed && xml.feed.entry) {
    return 'FEED';
  }
  return 'UNKNOWN';
};

export function parseFeedData(rawData: string): FeedData[] {
  const parsedXml: any = JSON.parse(xml2json.toJson(rawData));

  switch (checkFeedStandard(parsedXml)) {
    case 'RSS2':
      return R.flatten(parseRSS2(parsedXml.rss.channel.item, parsedXml.rss.channel));
    case 'YAHOO_FEED':
      return R.flatten(parseYahaooFeed(parsedXml.feed.entry, parsedXml.feed))
    case 'FEED':
      return R.flatten(parseFeed(parsedXml.feed.entry, parsedXml.feed));
    default:
      return [];
  }
}
