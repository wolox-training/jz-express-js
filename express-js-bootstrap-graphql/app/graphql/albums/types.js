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

exports.albumPhotos = new GraphQLObjectType({
  name: 'AlbumPhotos',
  fields: {
    albumId: { type: GraphQLString },
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    thumbnailUrl: { type: GraphQLString }
  }
});
