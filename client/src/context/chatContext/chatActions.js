import {
  ADD_ACTIVE_USER,
  ADD_MESSAGE,
  HANDLE_DELETED_MESSAGE,
  RESET_CONTEXT,
  SET_ACTIVE_USERS,
  SET_CHATROOMS,
  SET_CHAT_USERS,
  SET_CURRENT_CHATROOM,
  SET_MESSAGES,
} from "./chatConstants";

export const setChatrooms = (chatrooms) => {
  return {
    type: SET_CHATROOMS,
    payload: chatrooms,
  };
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};
export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
};
export const setChatUsers = (users) => {
  return {
    type: SET_CHAT_USERS,
    payload: users,
  };
};
export const setCurrentChatroom = (chatroom) => {
  return {
    type: SET_CURRENT_CHATROOM,
    payload: chatroom,
  };
};
export const handleDeletedMessage = (message) => {
  return {
    type: HANDLE_DELETED_MESSAGE,
    payload: message,
  };
};
export const setActiveUsers = (users) => {
  return {
    type: SET_ACTIVE_USERS,
    payload: users,
  };
};
export const addActiveUser = (user) => {
  return {
    type: ADD_ACTIVE_USER,
    payload: user,
  };
};
export const resetContext = () => {
  return {
    type: RESET_CONTEXT,
  };
};
