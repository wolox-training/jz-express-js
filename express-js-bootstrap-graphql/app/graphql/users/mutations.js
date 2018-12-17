const { GraphQLNonNull, GraphQLBoolean, GraphQLString } = require('graphql'),
  { getResources, postResources } = require('../../services/trainingApi'),
  config = require('../../../config'),
  { userInputType, signUpInputType } = require('./types');

exports.createUser = {
  description: 'create a single user',
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    await postResources('/users', data);
    return true;
  }
};

exports.signUp = {
  description: 'login a single User',
  type: GraphQLString,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(signUpInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const token = await postResources('/users/sessions', data);
    context.res.header(config.common.session.header_name, token.headers.authorization);
    return token.data;
  }
};
