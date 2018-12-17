const { GraphQLObjectType, GraphQLSchema } = require('graphql');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {}
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {}
  })
});
