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
