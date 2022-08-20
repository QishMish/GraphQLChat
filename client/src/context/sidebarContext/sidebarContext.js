import React, { useContext, createContext, useReducer } from "react";

import { setSidebar } from "./sidebarActions";
import { sidebarReducer } from "./sidebarReducer";

const sidebarContext = createContext();

const SIDEBAR_INITIAL_STATE = {
  current: "conversations",
};

export default function SidebarProvider(props) {
  
  const [sidebarState, dispatchSidebar] = useReducer(
    sidebarReducer,
    SIDEBAR_INITIAL_STATE
  );

  const setSidebarCurrentElement = (name) => {
    dispatchSidebar(setSidebar(name));
  };

  return (
    <sidebarContext.Provider
      value={{
        sidebarState: sidebarState,
        dispatchSidebar: dispatchSidebar,
        setSidebarCurrentElement: setSidebarCurrentElement,
      }}
    >
      {props.children}
    </sidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  return useContext(sidebarContext);
};
