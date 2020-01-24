import * as fs from 'fs';
import * as path from 'path';
import { parseFeedData } from './parser';
import { FeedData } from 'src/typing/feed';

test('test github parse(YAHOO_FEED)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_github.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);
  expect(feeds[0].id).toEqual('tag:github.com,2008:WatchEvent/9543985518');
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
  expect(feeds[0].id).toEqual('t3_bf1fw6');
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

test('test reddit parser(RSS)', async () => {
  const mockXmlData = fs.readFileSync(path.join(__dirname, './__mock_data__/_mock_dingxiangyisheng.xml'), 'utf-8');
  const feeds: FeedData[] = await parseFeedData(mockXmlData);

  expect(feeds[0].content.length).toEqual(7686);
  expect(feeds[0].originHref).toEqual('https://zhuanlan.zhihu.com/p/99354729');
  expect(feeds[0].title).toEqual('科普 | 即使害怕也该做的检查，不然得了癌症都不知道');
  expect(feeds[0].author).toEqual('丁香医生');
  expect(feeds[0].publishedDate).toEqual(new Date('2019-12-25T09:24:23.000Z'));
  expect(feeds.length).toEqual(20);
});
