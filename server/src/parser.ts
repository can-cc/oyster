import * as moment from 'moment';
import * as R from 'ramda';
import * as xml2js from 'xml2js';
import * as xml2json from 'xml2json';
var parse = require('xml-parser');

const parseATOM = (entrys: any[], feed) =>
  entrys.map(entry => {
    console.log(feed);
    const title = entry.title;
    const link = entry.link.href;
    const content = entry.content.$t;
    const published = entry.published;
    const updated = entry.updated;
    const author = R.path(['author', 'name'])(entry) || R.path(['author', 'name'])(feed);
    return { title, link, content, published, updated, author };
  });

const parseRSS2 = entrys =>
  entrys.map(entry => {
    const title = entry.title[0];
    const link = entry.link[0];
    const content = entry.description[0];
    const published = moment(entry.pubDate[0])
      .toDate()
      .getTime();
    const author = R.path(0)(entry.author);
    const creator = R.path(['dc:creator', 0])(entry);
    return { title, link, content, published, author };
  });

const checkFeedStandard = (feed: any): string => {
  if (feed.rss) {
    return 'RSS2';
  }
  if (feed.feed && feed.feed.entry) {
    return 'ATOM';
  }
  return 'UNKNOWN';
};

function parseXml(rawXmlData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    xml2js.parseString(rawXmlData, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

export const parseFeed = (rawData: string) => {
  const parsedXml: any = JSON.parse(xml2json.toJson(rawData));

  switch (checkFeedStandard(parsedXml)) {
    case 'RSS2':
      return R.flatten(parseRSS2(parsedXml.rss.channel[0].item));
    case 'ATOM':
      return R.flatten(parseATOM(parsedXml.feed.entry, parsedXml.feed));
    default:
      return [];
  }
};
