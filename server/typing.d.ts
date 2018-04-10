declare interface FeedSource {
  label: string;
  url: string;
}

declare interface FeedResult extends FeedSource {
  feedRawData: string;
}
