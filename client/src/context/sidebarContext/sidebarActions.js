import { SET_SIDEBAR } from "./sidebarConstants";

export const setSidebar = (sidebarId) => {
  return {
    type: SET_SIDEBAR,
    payload: sidebarId,
  };
};
