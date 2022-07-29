const {
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/constants");

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: false,
};

const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: JWT_ACCESS_TOKEN_EXPIRES_IN * 60 * 1000,
  expires: new Date(Date.now() + JWT_ACCESS_TOKEN_EXPIRES_IN * 60 * 1000),
};

const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: JWT_REFRESH_TOKEN_EXPIRES_IN * 60 * 1000,
  expires: new Date(Date.now() + JWT_REFRESH_TOKEN_EXPIRES_IN * 60 * 1000),
};

if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

module.exports = {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
};
