const userService = require("../../../services/user.service");

const userQueries = {
  me: async (parent, args, ctx) => ctx.user,
  getUserByUsername: async (parent, args, ctx) => {
    const { username } = args;
    const userResponse = await userService.getUserByUserName(username);
    return userResponse.user;
  },
};

module.exports = { userQueries };
