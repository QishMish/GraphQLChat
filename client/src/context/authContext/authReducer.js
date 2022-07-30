import { SIGN_UP, SIGN_IN, SIGN_OUT } from "./authConstants";

export const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.payload,
      };
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
