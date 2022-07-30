import { SET_CHATROOMS, SET_MESSAGES } from "./chatConstants";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case SET_CHATROOMS:
      return {
        ...state,
        chatrooms:action.payload
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages:action.payload
      };
    default:
      return state;
  }
};
