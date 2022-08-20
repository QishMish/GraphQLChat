import {
  SET_CHATROOMS,
  SET_MESSAGES,
  ADD_MESSAGE,
  SET_CHAT_USERS,
  SET_CURRENT_CHATROOM,
  HANDLE_DELETED_MESSAGE,
  SET_ACTIVE_USERS,
  ADD_ACTIVE_USER,
  RESET_CONTEXT,
  SET_LAST_MESSAGE,
  SET_SEARCH_KEYWORD,
  ADD_CURRENT_CHATROOM_MESSAGES,
  RESET_MESSAGES,
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
        messages: action.payload.messages,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
        currentChatroom: {
          ...state.currentChatroom,
          messages: [action.payload, ...state.currentChatroom.messages],
        },
      };
    case RESET_MESSAGES:
      return {
        ...state,
        messages: [],
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
    case ADD_CURRENT_CHATROOM_MESSAGES:
      const existingChatroom =
        Number(state.currentChatroom.id) === Number(action.payload.id);

      if (existingChatroom) {
        return {
          ...state,
          currentChatroom: {
            ...state.currentChatroom,
            hasMoreMessages: action.payload.hasMoreMessages,
            messages: state.currentChatroom.messages.concat(
              action.payload.messages
            ),
          },
        };
      }
      return {
        ...state,
        currentChatroom: action.payload,
      };
    case HANDLE_DELETED_MESSAGE:
      const newMessages = state.currentChatroom.messages.map((msg) => {
        if (Number(msg.id) === Number(action.payload.id)) {
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
        currentChatroom: {
          ...state.currentChatroom,
          messages: newMessages,
        },
      };
    case SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload,
      };
    case ADD_ACTIVE_USER:
      const exist = state.activeUsers.find(
        (u) => Number(u.id) === Number(action.payload.id)
      );
      if (exist) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        activeUsers: [...state.activeUsers, action.payload],
      };
    case RESET_CONTEXT:
      return {
        ...state,
        chatrooms: [],
        currentChatroom: {},
        messages: [],
        chatUsers: [],
        activeUsers: [],
      };
    case SET_LAST_MESSAGE:
      const chatroom = state.chatrooms.map((c) => {
        if (Number(c.id) === Number(action.payload.chatroomId)) {
          return {
            ...c,
            last_message: action.payload.lastMessage,
          };
        }
        return c;
      });
      return {
        ...state,
        chatrooms: chatroom,
        currentChatroom: {
          ...state.currentChatroom,
          last_message: action.payload.lastMessage,
        },
      };
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload,
      };
    default:
      return state;
  }
};
