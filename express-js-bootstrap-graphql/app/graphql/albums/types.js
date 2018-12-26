const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql');

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

exports.albumPhoto = new GraphQLObjectType({
  name: 'AlbumPhoto',
  fields: {
    albumId: { type: GraphQLString },
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString }
  }
});
