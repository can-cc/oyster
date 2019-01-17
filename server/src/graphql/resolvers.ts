import feedService from '../service/feed.service';
import feedSourceService from '../service/feed-source.service';

export const resolvers = {
  Query: {
    feeds: async (root, args: { limit: number; offset?: number }, context) => {
      return await feedService.getFeeds({
        userId: 1,
        limit: args.limit,
        offset: args.offset
      });
    },
    sources: async (root, args: {}) => {
      return await feedSourceService.getFeedSources();
    },
    sourceFeeds: async (root, args: {sourceId: string; offset?: number, limit?: number}) => {
      const userId = root.context.auth.id;
      return await feedService.getSourceFeeds({
        userId,
        sourceId: args.sourceId,
        offset: args.offset,
        limit: args.limit
      });
    }
  },
  Mutation: {
    source: async (root, { name, url }) => {
      return await feedSourceService.saveFeedSource({ name, url });
    }
  }
};
