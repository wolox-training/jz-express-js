const { GraphQLNonNull, GraphQLString } = require('graphql'),
  { postResources } = require('../../services/trainingApi'),
  config = require('../../../config'),
  { userInputType, signUpInputType } = require('./types');

exports.createUser = {
  description: 'create a single user',
  type: GraphQLString,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const userCreated = await postResources('/users', data, '');
    return userCreated.data;
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

exports.upsertUserAdmin = {
  description: 'upsert single userAdmin',
  type: GraphQLString,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType)
    }
  },
  resolve: async (obj, { data }, context, info) => {
    const upsertAdUser = await postResources('/admin/users', data, context.headers);
    return upsertAdUser.data;
  }
};
