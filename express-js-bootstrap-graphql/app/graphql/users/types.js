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

exports.users = new GraphQLObjectType({
  name: 'Users',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: { type: GraphQLString }
  }
});

exports.userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

exports.signUpInputType = new GraphQLInputObjectType({
  name: 'UserLogin',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
});
