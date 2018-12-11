import * as moment from 'moment';
import * as R from 'ramda';
import * as xml2json from 'xml2json';

const parseATOM = (entrys: any[], feed): Feed[] =>
  entrys.map((entry): Feed => {
    const title = entry.title;
    const link = entry.link.href;
    const content = entry.content.$t;
    const published =
      moment(entry.published)
        .toDate()
        .getTime() ||
      moment(entry.updated)
        .toDate()
        .getTime();
    const author = R.path(['author', 'name'])(entry) || R.path(['author', 'name'])(feed);
    return { title, link, content, published, author };
  });

const parseRSS2 = (entrys: any[], channel: any): Feed[] =>
  entrys.map((entry: any): Feed => {
    const title = entry.title;
    const link = entry.link;
    const content = entry.description;
    const published = moment(entry.pubDate)
      .toDate()
      .getTime();
    const author = entry.author || R.path(['dc:creator'])(entry);
    return { title, link, content, published, author };
  });

const checkFeedStandard = (xml: any): 'RSS2' | 'ATOM' | 'UNKNOWN' => {
  if (xml.rss) {
    return 'RSS2';
  }
  if (xml.feed && xml.feed.entry) {
    return 'ATOM';
  }
  return 'UNKNOWN';
};

export const parseFeed = (rawData: string) => {
  const parsedXml: any = JSON.parse(xml2json.toJson(rawData));

  switch (checkFeedStandard(parsedXml)) {
    case 'RSS2':
      return R.flatten(parseRSS2(parsedXml.rss.channel.item, parsedXml.rss.channel));
    case 'ATOM':
      return R.flatten(parseATOM(parsedXml.feed.entry, parsedXml.feed));
    default:
      return [];
  }
};
