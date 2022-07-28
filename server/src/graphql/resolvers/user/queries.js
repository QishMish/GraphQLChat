const userService = require("../../../services/user.service");

const userQueries = {
  getUsers: async (parent, args, ctx) => {
    const usersResponse = await userService.getAll();
    return usersResponse.users;
  },
  getUserById: async (parent, args, ctx) => {
    const { userId } = args;
    const userResponse = await userService.getUserById(userId);
    return userResponse.user;
  },
  getUserByUsername: async (parent, args, ctx) => {
    const { username } = args;
    console.log(args)
    const userResponse = await userService.getUserByUserName(username);
    return userResponse.user;
  },
};

module.exports = { userQueries };
