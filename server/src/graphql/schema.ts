import { resolvers } from './resolvers';
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

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
