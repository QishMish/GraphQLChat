const chatService = require("./../../../services/chat.service");

const chatMutations = {
  sendNewMessage: async (parent, args, { pubsub, user }) => {
    const { chatroomId, newMessageInput } = args;
    const { id: userId } = user;

    const newMessageResponse = await chatService.sendNewMessage(
      userId,
      chatroomId,
      newMessageInput
    );
    pubsub.publish("NEW_MESSAGE", { onNewMessageCreated: newMessageResponse });
    return newMessageResponse;
  },
  deleteMessage: async (parent, args, { pubsub, user }) => {
    const { messageId } = args;
    const { id: userId } = user;

    const deleteMessageResponse = await chatService.deleteMessage(
      userId,
      messageId
    );
    pubsub.publish("MESSAGE_DELETED", {
      onMessageDeleted: deleteMessageResponse,
    });
    return {
      status: "SUCCESS",
      message: "Message has been removed",
    };
  },
  createChatroomGroup: async (parent, args, ctx) => {
    const { createChatroomGroupInput } = args;
    const { id: userId } = ctx.user;
    const createChatroomGroup = await chatService.createChatroomGroup(
      userId,
      createChatroomGroupInput
    );
    return createChatroomGroup;
  },
  addChatRoomGroupMembers: async (parent, args, ctx) => {
    const { addChatRoomGroupMembersInput } = args;
    const { id: userId } = ctx.user;
    const { chatroomId } = args;

    const addChatRoomGroupMembersResponse =
      await chatService.addChatRoomGroupMembers(
        userId,
        chatroomId,
        addChatRoomGroupMembersInput
      );
    return {
      status: "SUCCESS",
      message:
        addChatRoomGroupMembersInput.length > 1
          ? "Users successfully added to chatroom"
          : "User successfully added to chatroom",
    };
  },
  removeChatRoomGroupMembers: async (parent, args, ctx) => {
    const { removeChatRoomGroupMemberInput } = args;
    const { id: userId } = ctx.user;
    const { chatroomId } = args;

    const removeChatRoomGroupMemberResponse =
      await chatService.removeChatRoomGroupMembers(
        userId,
        chatroomId,
        removeChatRoomGroupMemberInput
      );
    return {
      status: "SUCCESS",
      message:
        removeChatRoomGroupMemberInput.length > 1
          ? "Users successfully added to chatroom"
          : "User successfully added to chatroom",
    };
  },
  deleteChatroomGroup: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const { chatroomId } = args;

    const deleteChatroomResponse = await chatService.deleteChatroomGroup(
      userId,
      chatroomId
    );
    return {
      status: "SUCCESS",
      message: `Successfully deleted chatroom ${chatroomId}`,
    };
  },
  getConversationByUserIdsOrCreate: async (parent, args, ctx) => {
    const { id: userId } = ctx.user;
    const { memberId } = args;

    const getConversationByUserIdsOrCreateResponse =
      await chatService.getConversationByUserIdsOrCreate(userId, memberId);
    return getConversationByUserIdsOrCreateResponse.response;
  },
};

module.exports = { chatMutations };
