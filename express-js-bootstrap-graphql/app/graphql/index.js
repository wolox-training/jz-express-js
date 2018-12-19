const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
  users = require('./users'),
  albums = require('./albums');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',

    fields: {
      ...users.queries,
      ...albums.queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...users.mutations
    }
  })
});
