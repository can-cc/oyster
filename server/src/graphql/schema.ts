import feedService from '../service/feed.service';
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Query { 
    feeds(limit: Int! offset: Int): [Feed]
    sources: [FeedSource]
  }
  type Mutation { source(name: String! url: String!): FeedSource }
  type FeedSource { id: String, name: String, url: String}
  type Feed { id: Int, title: String, author: String, originHref: String, sourceId: String, content: String, createdAt: String, updatedAt: String }
`;

// The resolvers
const resolvers = {
  Query: {
    feeds: async (root, args: { limit: number; offset?: number }, context) => {
      return await feedService.getFeeds(args.limit, args.offset);
    },
    sources: async (root, args: {}) => {
      return await feedService.getFeedSources();
    }
  },
  Mutation: {
    source: async (root, {name, url}) => {
      return await feedService.saveFeedSource({name, url});
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
