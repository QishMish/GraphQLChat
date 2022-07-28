const chatService = require("../../../services/chat.service");

const chatQueries = {
  fetchChatrooms: async (parent, args, ctx) => {
    const usersResponse = await chatService.fetchChatrooms();
    return usersResponse.response;
  },
  fetchChatroomMessages: async (parent, args, ctx) => {
    const usersResponse = await chatService.fetchChatroomMessages();
    return usersResponse.response;
  },
};

module.exports = { chatQueries };
