const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
  users = require('./users'),
  books = require('./books');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...books.queries,
      ...users.queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...books.mutations,
      ...users.mutations
    }
  })
});
