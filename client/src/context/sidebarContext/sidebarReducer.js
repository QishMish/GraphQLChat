import { SET_SIDEBAR } from "./sidebarConstants";

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case SET_SIDEBAR:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};
