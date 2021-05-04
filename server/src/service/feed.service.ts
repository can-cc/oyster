import { getRepository } from 'typeorm';
import { Feed } from '../entity/feed';

type Category = 'all' | 'favorite' | string;

class FeedService {
  public async getFeeds({ userId, limit, offset, from, category, order, search = undefined }): Promise<Feed[]> {
    switch (category as Category) {
      case '_all':
      case null:
      case undefined:
        return this.getAllFeeds({ userId, limit, offset, from, order, search });
      case '_favorite':
        return this.getFavoriteFeeds({ userId, limit, offset, from, order, search });
      default:
        return this.getSourceFeeds({ userId, limit, offset, sourceId: category, from, order, search });
    }
  }

  public async saveFeed(feed: Feed): Promise<Feed> {
    const savedFeed: Feed = await getRepository(Feed).save(feed);
    return savedFeed;
  }

  public async findFeed(feedId: number): Promise<Feed> {
    return await getRepository(Feed).findOne({ id: feedId });
  }

  private async getAllFeeds({ userId, limit, offset, from, order, search }): Promise<Feed[]> {
    console.log('search', search);
    return await getRepository(Feed)
      .createQueryBuilder('feed')
      .orderBy('"feed"."createdAt"', order.toUpperCase())
      .leftJoinAndSelect('feed.marks', 'feed_mark', '"feed_mark"."userId" = :userId', { userId })
      .leftJoinAndSelect('feed.source', 'feed_source')
      .where(`"feed"."id" ${order === 'desc' && !!Number(from) ? '<' : '>'} :from`, { from: from || 0 })
      .andWhere(!!search ? `("feed".title LIKE '%${search}%' OR "feed".content LIKE '%${search}%')` : '1=1')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  private async getFavoriteFeeds({ userId, limit, offset, from, order, search }): Promise<Feed[]> {
    return await getRepository(Feed)
      .createQueryBuilder('feed')
      .innerJoinAndSelect(
        'feed.marks',
        'feed_mark',
        '"feed_mark"."userId" = :userId AND "feed_mark"."type" = :markType',
        { userId, markType: 'FAVORITE' }
      )
      .leftJoinAndSelect('feed.source', 'feed_source')
      .orderBy('"feed"."createdAt"', order.toUpperCase())
      .where(`"feed"."id" ${order === 'desc' && !!Number(from) ? '<' : '>'} :from`, { from: from || 0 })
      .andWhere(!!search ? `("feed".title LIKE '%${search}%' OR "feed".content LIKE '%${search}%')` : '1=1')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  private async getSourceFeeds({ userId, sourceId, limit, offset, from, order, search }): Promise<Feed[]> {
    return await getRepository(Feed)
      .createQueryBuilder('feed')
      .leftJoinAndSelect('feed.marks', 'feed_mark', '"feed_mark"."userId" = :userId', { userId })
      .leftJoinAndSelect('feed.source', 'feed_source')
      .where('feed_source.id = :sourceId', { sourceId })
      .andWhere(`"feed"."id" ${order === 'desc' && !!Number(from) ? '<' : '>'} :from`, { from: from || 0 })
      .andWhere(!!search ? `("feed".title LIKE '%${search}%' OR "feed".content LIKE '%${search}%')` : '1=1')
      .orderBy('"feed"."createdAt"', order.toUpperCase())
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}

export default new FeedService();
