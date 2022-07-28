const { AuthenticationError } = require('apollo-server-express');

const requireUser = async context => {
  console.log(context.req.user);
  if (!context.req.user)
    throw new AuthenticationError('Signed in user required for this action ');
  return context;
};

module.exports = {
  requireUser,
};
