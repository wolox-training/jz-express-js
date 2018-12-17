const { GraphQLObjectType, GraphQLSchema } = require('graphql'),
  users = require('./users');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',

    fields: {
      ...users.queries
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...users.mutations
    }
  })
});
