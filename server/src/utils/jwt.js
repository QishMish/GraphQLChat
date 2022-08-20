const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_ACCESS_TOKEN_KEY } = require("../config/constants");
const { getUserById } = require("../services/user.service");

const signJwt = async (payload, secret, { expiresIn }) => {
  var token = await jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
};
const findUser = async (accessToken) => {
  const valid = await verifyJwt(accessToken, JWT_ACCESS_TOKEN_KEY);
  const user = valid ? await getUserById(valid.id) : null;
  return user.user ? user.user : null;
};
const verifyJwt = async (token, secret) => {
  try {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  signJwt,
  verifyJwt,
  hashPassword,
  findUser,
};
