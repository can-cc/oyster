export declare interface FeedSource {
  id: string;
  name: string;
  url: string;
}

export declare interface Feed {
  id?: number;
  title: string;
  source?: string;
  link: string;
  content: string;
  author: string;
  published: number;
}

export declare interface CreateFeedSourceInput {
  name: string;
  url: string;
}
