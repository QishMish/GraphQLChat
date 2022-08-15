const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = require("./constants");

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
};
