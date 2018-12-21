import feedService from "src/service/feed.service";
import feedSourceService from "src/service/feed-source.service";

export const resolvers = {
  Query: {
    feeds: async (root, args: { limit: number; offset?: number }, context) => {
      return await feedService.getFeeds(args.limit, args.offset);
    },
    sources: async (root, args: {}) => {
      return await feedSourceService.getFeedSources();
    }
  },
  Mutation: {
    source: async (root, {name, url}) => {
      return await feedSourceService.saveFeedSource({name, url});
    }
  }
};