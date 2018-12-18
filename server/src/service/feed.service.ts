import { getRepository } from 'typeorm';
import { FeedSource } from '../entity/FeedSource';


class FeedService {
  
  public getFeeds(limit: number, offset: number) {}

  public async saveFeedSource({name, url}): Promise<FeedSource> {
    const feedSource = new FeedSource();
    feedSource.name = name;
    feedSource.url = url;
    const savedFeedSource: FeedSource = await getRepository(FeedSource).save(feedSource);
    return savedFeedSource;
  }

}

export default new FeedService();