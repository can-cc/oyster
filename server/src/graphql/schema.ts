import { getAtoms } from '../dao';
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type Query { 
    feeds(limit: Int! offset: Int): [Feed]
    sources: [FeedSource]
  }
  type Mutation { source(name: String! url: String!): Boolean }
  type FeedSource { id: String, name: String, url: String}
  type Feed { id: Int, title: String, author: String, link: String, source: String, content: String, published: Float, isRead: Boolean }
`;

// The resolvers
const resolvers = {
  Query: {
    feeds: async (root, args: { limit: number; offset?: number }, context) => {
      return await getAtoms(args.limit, args.offset);
    },
    sources: (root, args: {}) => {
      return [{id: 1}];
    }
  },
  Mutation: {
    source: (root, args: { name: string; url: string }) => {
      return true;
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
