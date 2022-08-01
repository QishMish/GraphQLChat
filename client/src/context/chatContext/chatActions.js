import { ADD_MESSAGE, SET_CHATROOMS, SET_MESSAGES } from "./chatConstants";

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