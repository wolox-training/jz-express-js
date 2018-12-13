const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLInputObjectType
  } = require('graphql');

  exports.albumType = new GraphQLObjectType({
    name: 'Album',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      title: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  });