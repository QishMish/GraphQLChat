require('dotenv').config();

const {
  PORT,
  NODE_ENV,
  JWT_ACCESS_TOKEN_KEY,
  JWT_REFRESH_TOKEN_KEY,
  DB_NAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = process.env;


module.exports = {
  PORT,
  NODE_ENV,
  JWT_ACCESS_TOKEN_KEY,
  JWT_REFRESH_TOKEN_KEY,
  DB_NAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
};
