import { FeedSource } from '../entity/FeedSource';

export interface FeedData {
  title: string;
  content: string;
  originHref: string;
  publishedDate: Date;
  author: string;
  source?: FeedSource;
}

export interface FeedResult {
  source: FeedSource;
  feedRawData: string;
}
