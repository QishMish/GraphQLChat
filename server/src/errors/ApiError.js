const { ApolloError } = require("apollo-server-errors");

class ApiError extends ApolloError {
  constructor(message) {
    super(message, "MY_ERROR_CODE");

    Object.defineProperty(this, "name", { value: "MyError" });
  }
}

class ResourceNotFoundError extends ApiError {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  ApiError,
  ResourceNotFoundError,
};
