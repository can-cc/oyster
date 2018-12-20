export declare interface FeedSource {
  id: string;
  name: string;
  url: string;
}

export declare interface Feed {
  id?: number;
  title: string;
  source?: string;
  originHref: string;
  content: string;
  author: string;
  createdAt: number;
}

export declare interface CreateFeedSourceInput {
  name: string;
  url: string;
}
