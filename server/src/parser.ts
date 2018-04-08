import moment from 'moment';
import R from 'ramda';
import xml2js from 'xml2js';

const parseATOM = entrys =>
  entrys.map(entry => {
    const title = entry.title[0]._ || entry.title[0];
    const link = entry.link[0].$.href;
    const content = R.path([0, '_'])(entry.content);
    const summary = R.path([0, '_'])(entry.summary);
    const published = R.path(0)(entry.published);
    const updated = R.path(0)(entry.updated);
    const author = R.path([0, 'name', 0])(entry.author);
    return { title, link, content, summary, published, updated, author };
  });

const parseRSS2 = entrys =>
  entrys.map(entry => {
    const title = entry.title[0];
    const link = entry.link[0];
    const content = entry.description[0];
    const published = moment(entry.pubDate[0]).toDate().getTime();
    const author = R.path(0)(entry.author);
    const creator = R.path(['dc:creator', 0])(entry);
    return { title, link, content, published, author };
  });

const checkFeedStandard = feed => {
  if (!!feed.rss) {
    return 'RSS2';
  }
  if (!!feed.feed.entry) {
    return 'ATOM';
  }
};

function parseXml(rawXmlData) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(rawXmlData, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

export const parseFeed = async rawData => {
  const parsedXml = await parseXml(rawData);
  switch (checkFeedStandard(parsedXml)) {
    case 'RSS2':
      return R.flatten(parseRSS2(parsedXml.rss.channel[0].item));
    case 'ATOM':
      return R.flatten(parseATOM(parsedXml.feed.entry));
    default:
      return [];
  }
};
