export interface FeedSource {
  id: string;
  name: string;
  url: string;
}

export interface Feed {
  id?: string;
  title: string;
  source?: string;
  originHref: string;
  content: string;
  author: string;
  createdAt: number;
}

export interface CreateFeedSourceInput {
  name: string;
  url: string;
}
