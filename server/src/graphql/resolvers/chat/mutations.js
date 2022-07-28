const chatService = require('./../../../services/chat.service');

const chatMutation = {
  sendNewMessage: async (parent, args, ctx) => {
    const { chatroomId, newMessageInput } = args;
    const { id: userId } = ctx.user;
    const newMessageResponse = await chatService.sendNewMessage(
      userId,
      chatroomId,
      newMessageInput
    );
    return newMessageResponse;
  },
  deleteMessage: async (parent, args, ctx) => {
    const { messageId } = args;
    const { id: userId } = ctx.user;

    const deleteMessageResponse = await chatService.deleteMessage(
      userId,
      messageId
    );
    return {
      status: 'SUCCESS',
      message: 'Message has been removed',
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
      status: 'SUCCESS',
      message:
        addChatRoomGroupMembersInput.length > 1
          ? 'Users successfully added to chatroom'
          : 'User successfully added to chatroom',
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
      status: 'SUCCESS',
      message:
        removeChatRoomGroupMemberInput.length > 1
          ? 'Users successfully added to chatroom'
          : 'User successfully added to chatroom',
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
      status: 'SUCCESS',
      message: `Successfully deleted chatroom ${chatroomId}`,
    };
  },
};

module.exports = { chatMutation };
