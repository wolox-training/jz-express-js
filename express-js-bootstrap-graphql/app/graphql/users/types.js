const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

const userType = new GraphQLObjectType({
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

exports.userType = userType;

exports.userList = new GraphQLObjectType({
  name: 'UserList',
  fields: {
    users: {
      type: new GraphQLNonNull(new GraphQLList(userType))
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    pages: {
      type: new GraphQLNonNull(GraphQLInt)
    }
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
