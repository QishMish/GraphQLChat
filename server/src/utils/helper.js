const { JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_EXPIRES_IN } = require("../config/constants");

function getMethods(object) {
  return Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(
    (m) => "function" === typeof object[m]
  );
}

module.exports = {
  getMethods,
};
