declare namespace Express {
  interface Request {
    useragent: {
      isMobile: boolean;
      isDesktop: true;
      isBot: false;
      browser: string;
      version: string;
      os: string;
      platform: string;
      source: string;
    };
  }
}

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

declare interface Feed {
  id?: number;
  title: string;
  source?: string;
  link: string;
  content: string;
  author: string;
  published: number;
}

declare interface VapidKeys {
  publicKey: string;
  privateKey: string;
}

declare interface WebPushSubscription {
  endpoint: string;
  expirationTime: string | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

declare interface WebPushNotification {
  title: string;
  content: string;
  link: string;
}
