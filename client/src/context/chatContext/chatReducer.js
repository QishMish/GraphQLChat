import {
  SET_CHATROOMS,
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_CHAT_USERS,
  SET_CURRENT_CHATROOM,
  HANDLE_DELETED_MESSAGE,
} from "./chatConstants";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SET_CHAT_USERS:
      return {
        ...state,
        chatUsers: action.payload,
      };
    case SET_CURRENT_CHATROOM:
      return {
        ...state,
        currentChatroom: action.payload,
      };
    case HANDLE_DELETED_MESSAGE:
      console.log(action.payload)
      const newMessages = state.messages.map((msg) => {
        if (Number(msg.id) === action.payload.id) {
          return {
            ...msg,
            content: action.payload.content,
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: newMessages,
      };
    default:
      return state;
  }
};
