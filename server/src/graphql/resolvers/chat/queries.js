const chatService = require("../../../services/chat.service");

const chatQueries = {
  fetchChatrooms: async (parent, args, ctx) => {
    const usersResponse = await chatService.fetchChatrooms();
    return usersResponse.response;
  },
  fetchChatroomMessages: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const { chatroomId } = args;
    const usersResponse = await chatService.fetchChatroomMessages(chatroomId);
    return usersResponse.response;
  },
};

module.exports = { chatQueries };
