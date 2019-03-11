import { getRepository } from 'typeorm';
import { Feed } from '../entity/Feed';

type Category = 'all' | 'favorite' | string;

class FeedService {
  public async getFeeds({ userId, limit, offset, category }): Promise<Feed[]> {
    switch (category as Category) {
      case 'all':
      case null:
      case undefined:
        return this.getAllFeeds({userId, limit, offset});
      case 'favorite':
        return this.getFavoriteFeeds({userId, limit, offset});
      default:
        return this.getSourceFeeds({userId, limit, offset, sourceId: category});
    }
  }

  public async saveFeed(feed: Feed): Promise<Feed> {
    const savedFeed: Feed = await getRepository(Feed).save(feed);
    return savedFeed;
  }

  public async findFeed(feedId: string): Promise<Feed> {
    return await getRepository(Feed).findOne({ id: feedId });
  }

  private async getAllFeeds({ userId, limit, offset}): Promise<Feed[]>  {
    return await getRepository(Feed)
    .createQueryBuilder('feed')
    .leftJoinAndSelect('feed.marks', 'feed_mark', '"feed_mark"."userId" = :userId', { userId })
    .leftJoinAndSelect("feed.source", "feed_source")
    .orderBy('"feed"."createdAt"', 'DESC')
    .limit(limit)
    .offset(offset)
    .getMany();
  }

  private async getFavoriteFeeds({userId, limit, offset}): Promise<Feed[]> {
    return await getRepository(Feed)
      .createQueryBuilder('feed')
      .innerJoinAndSelect('feed.marks', 'feed_mark', '"feed_mark"."userId" = :userId AND "feed_mark"."type" = :favorite', { userId, favorite: 'FAVORITE' })
      .leftJoinAndSelect("feed.source", "feed_source")
      .orderBy('"feed"."createdAt"', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  private async getSourceFeeds({userId, sourceId, limit, offset}): Promise<Feed[]> {
    return await getRepository(Feed)
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.marks', 'feed_mark', '"feed_mark"."userId" = :userId', { userId })
      .leftJoinAndSelect("feed.source", "feed_source")
      .where('feed_source.id = :sourceId', {sourceId})
      .orderBy('"feed"."createdAt"', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}

export default new FeedService();
