const userService = require("./../../../services/user.service");
const chatService = require("./../../../services/chat.service");

const adminQueries = {
  //user
  getUsers: async (parent, args, ctx) => {
    const usersResponse = await userService.getAll();
    return usersResponse.users;
  },
  getUserById: async (parent, args, ctx) => {
    const { userId } = args;
    const userResponse = await userService.getUserById(userId);
    return userResponse.user;
  },
  //chat
  fetchChatRoomUsers: async (parent, args, ctx) => {
    const { chatroomId } = args;
    const userResponse = await chatService.fetchChatRoomUsers(chatroomId);
    return userResponse.users;
  },
};

module.exports = { adminQueries };
