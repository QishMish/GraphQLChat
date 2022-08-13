const userService = require("../../../services/user.service");

const userQueries = {
  me: async (parent, args, ctx) => ctx.user,
  getUserByUsername: async (parent, args, ctx) => {
    const { username } = args;
    const userResponse = await userService.getUserByUserName(username);
    return userResponse.user;
  },
  fetchActiveUsers: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    console.log(userId);
    const activeUsers = await userService.getActiveUsers(userId);
    return activeUsers;
  },
};

module.exports = { userQueries };
