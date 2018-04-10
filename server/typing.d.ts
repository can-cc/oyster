declare interface FeedSource {
  label: string;
  url: string;
}

declare interface FeedSetting {
  feeds: FeedSource[];
  fetchinginterval: number;
}

declare interface FeedResult extends FeedSource {
  feedRawData: string;
}
