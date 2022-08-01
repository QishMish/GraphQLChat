const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN_KEY } = require("../config/constants");
const { getUserById } = require("../services/user.service");
const { verifyJwt } = require("../utils/jwt");

const authMiddleware = async (context) => {
  let token;
  // if (context.req && context.req.headers.authorization) {
  //   token = context.req.headers.authorization.split("Bearer ")[1];
  // } else if (context.connection && context.connection.context.Authorization) {
  //   token = context.connection.context.authorization.split("Bearer ")[1];
  // }

  if (context.req && context.req.headers.access_token) {
    token = context.req.headers.access_token.split("Bearer ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.authorization.split("Bearer ")[1];
  }

  if (token) {
    const valid = await verifyJwt(token, JWT_ACCESS_TOKEN_KEY);
    const user = valid ? await getUserById(valid.id) : null;
    console.log(user);
    user ? (context.user = user.user) : (context.user = null);
  }

  return context;
};

module.exports = {
  authMiddleware,
};
