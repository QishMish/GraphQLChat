const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");  
const { JWT_ACCESS_TOKEN_KEY } = require("../config/constants");

const signJwt = async (payload, secret) => {
  var token = await jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
  return token;
};

const verifyJwt = async (token, secret) => {
  // console.log("yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2NTg3MzM4OTcsImV4cCI6MTY1OTMzODY5N30.jP4GsyrRFgSVJl1QgSVKRuJ7fPMWQgZ7WFtmn1lsJFw");
  // console.log(token)
  // console.log(JWT_ACCESS_TOKEN_KEY)
  // console.log(secret)

  try {
    const decoded = await jwt.verify(token, secret);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.log(error);
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
};
