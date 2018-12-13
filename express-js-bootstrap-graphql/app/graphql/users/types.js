const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLInputObjectType
  } = require('graphql');

  exports.userType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString)
      },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      roleUser: { type: GraphQLString }
    }
  });
  
  exports.bookInputType = new GraphQLInputObjectType({
    name: 'BookInput',
    fields: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      author: { type: GraphQLString },
      publisher: { type: GraphQLString },
      price: { type: GraphQLInt },
      link: { type: GraphQLString },
      year: { type: GraphQLInt }
    }
  });
  