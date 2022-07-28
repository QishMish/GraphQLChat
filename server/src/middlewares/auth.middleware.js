const jwt = require('jsonwebtoken');
const { JWT_ACCESS_TOKEN_KEY } = require('../config/constants');
const { verifyJwt } = require('../utils/jwt');

const authMiddleware = async context => {
  let token;
  console.log('fa');
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.authorization.split('Bearer ')[1];
  }

  // console.log(token);
  if (token) {
    const user = await verifyJwt(token, JWT_ACCESS_TOKEN_KEY);
    console.log(user);
    user ? (context.user = user) : null;
  }

  return context;
};

module.exports = {
  authMiddleware,
};
