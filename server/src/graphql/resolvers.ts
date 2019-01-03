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
    }
  },
  Mutation: {
    source: async (root, { name, url }) => {
      return await feedSourceService.saveFeedSource({ name, url });
    }
  }
};
