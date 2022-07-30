import { SET_CHATROOMS, SET_MESSAGES } from "./chatConstants";

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
