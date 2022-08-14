const { AuthenticationError } = require('apollo-server-express');

const requireUser = async context => {
  if (!context.req.user)
    throw new AuthenticationError('Signed in user required for this action ');
  return context;
};

module.exports = {
  requireUser,
};
