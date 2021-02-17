import feedService from '../service/feed.service';
import feedSourceService from '../service/feed-source.service';

export const resolvers = {
  Query: {
    feeds: async (root, args: { limit: number; offset: number; category: string }, context) => {
      return await feedService.getFeeds({
        userId: context.auth.id,
        limit: args.limit,
        offset: args.offset,
        category: args.category,
        order: 'desc',
        from: null
      });
    },
    sources: async (root, args: {}) => {
      return await feedSourceService.getFeedSources();
    }
  },
  Mutation: {
    addSource: async (root, { name, url }) => {
      return await feedSourceService.saveFeedSource({ name, url });
    },
    removeSource: async (root, { id }) => {
      const result: string = await feedSourceService.removeFeedSource({ id });
      return { result };
    }
  }
};
