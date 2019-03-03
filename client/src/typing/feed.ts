export interface StoreType {
  feed: {
    feedSources: FeedSource[];
    feedMap: { [id: string]: Feed };
    feedIds: string[];
  };
}

export interface FeedSource {
  id: string;
  name: string;
  url: string;
}

export interface Feed {
  id?: string;
  title: string;
  source?: FeedSource;
  originHref: string;
  content: string;
  author: string;
  publishedDate: string;
  createdAt: string;
  marks: FeedMark[];
}

export interface FeedMark {
  id: string;
  type: string;
}

export interface CreateFeedSourceInput {
  name: string;
  url: string;
}
