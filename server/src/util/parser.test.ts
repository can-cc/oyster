import * as fs from 'fs';
import * as path from 'path';
import { parseFeedData } from './parser';
import { FeedData } from 'src/typing/feed';

test('test github parse(YAHOO_FEED)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_github.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);
  expect(feeds[0].globalID).toEqual('tag:github.com,2008:WatchEvent/9543985518');
  expect(feeds[0].title).toEqual('kenshinji starred imshubhamsingh/file-system-react');
  // expect(feeds[0].content.length).toEqual(2354);
  expect(feeds[0].originHref).toEqual('https://github.com/imshubhamsingh/file-system-react');
  expect(feeds[0].publishedDate.toUTCString()).toEqual('Tue, 01 Jan 2019 00:00:00 GMT');
  expect(feeds[0].author).toEqual('kenshinji');
  expect(feeds[0].source).toEqual(undefined);
  expect(feeds.length).toEqual(30);
});

test('test reddit parser(FEED)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_reddit.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);
  expect(feeds[0].globalID).toEqual('t3_bf1fw6');
  expect(feeds[0].title).toEqual('/r/selfhosted is looking for more moderators');
  expect(feeds[0].content.length).toEqual(1661);
  expect(feeds[0].originHref).toEqual(
    'https://www.reddit.com/r/selfhosted/comments/bf1fw6/rselfhosted_is_looking_for_more_moderators/'
  );
  expect(feeds[0].author).toEqual('/u/tamale_uk');
  expect(feeds[0].publishedDate.toUTCString()).toEqual('Fri, 19 Apr 2019 16:55:50 GMT');
  expect(feeds[0].source).toEqual(undefined);
  expect(feeds.length).toEqual(26);
});

test('test 丁香医生 parser(RSS2)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_dingxiangyisheng.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);

  expect(feeds[0].content.length).toEqual(7686);
  expect(feeds[0].originHref).toEqual('https://zhuanlan.zhihu.com/p/99354729');
  expect(feeds[0].title).toEqual('科普 | 即使害怕也该做的检查，不然得了癌症都不知道');
  expect(feeds[0].author).toEqual('丁香医生');
  expect(feeds[0].publishedDate).toEqual(new Date('2019-12-25T09:24:23.000Z'));
  expect(feeds.length).toEqual(20);
});

test('test ithome parser(RSS2)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_ithome.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);

  expect(feeds[0].content.length).toEqual(333);
  expect(feeds[0].originHref).toEqual('https://ithome.com.tw/review/135973');
  expect(feeds[0].globalID).toEqual('https://ithome.com.tw/review/135973');
  expect(feeds[0].title).toEqual('結合區塊鏈技術，BlockChain Security推雲端郵件存證與真偽驗證方案');
  expect(feeds[0].author).toEqual('羅正漢');
  expect(feeds[0].publishedDate).toEqual(new Date('2020-02-25T09:02:51.000Z'));

  expect(feeds.length).toEqual(30);
});

test('test v2ex parser(FEED)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_v2ex.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);

  expect(feeds[0].title).toEqual('大家会去 stackoverflow 回答问题吗？');
  expect(feeds[0].content.length).toEqual(67);
  expect(feeds[0].originHref).toEqual('https://www.v2ex.com/t/648847#reply5');
  expect(feeds[0].globalID).toEqual('tag:www.v2ex.com,2020-03-01:/t/648847');
  expect(feeds[0].author).toEqual('wxd92');
  expect(feeds[0].publishedDate).toEqual(new Date('2020-03-01T08:25:08.000Z'));
  expect(feeds.length).toEqual(40);
});

test('test infoq parser(RSS2)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_infoq.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);

  expect(feeds[0].title).toEqual('Apache Tomcat被曝重大漏洞，影响过去13年的所有版本');
  expect(feeds[0].content.length).toEqual(860);
  expect(feeds[0].originHref).toEqual('https://www.infoq.cn/article/CyeCTLTTqWT2QJkuLEh3?utm_source=rss&utm_medium=article');
  expect(feeds[0].globalID).toEqual('https://www.infoq.cn/article/CyeCTLTTqWT2QJkuLEh3?utm_source=rss&utm_medium=article');
  expect(feeds[0].author).toEqual('万佳');
  expect(feeds[0].publishedDate).toEqual(new Date('2020-03-02T11:55:22.000Z'));
  expect(feeds.length).toEqual(20);
});