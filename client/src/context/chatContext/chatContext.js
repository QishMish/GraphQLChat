import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { setChatrooms, setMessages } from "./chatActions";
import { SET_CHATROOMS, SET_MESSAGES } from "./chatConstants";
import { chatReducer } from "./chatReducer";

const chatContext = createContext();

const CHAT_INITIAL_STATE = {
  chatrooms: [],
  messages: [],
};

export default function ChatProvider(props) {
  const [chatState, dispatchChat] = useReducer(chatReducer, CHAT_INITIAL_STATE);

  const setChatroomsHandler = (chatrooms) => {
    console.log("setChatroomsHandler")
    dispatchChat(setChatrooms(chatrooms));
  };

  const setMessagesHandler = (messages) => {
    console.log("setMessagesHandler")
    dispatchChat(setMessages(messages));
  };

  return (
    <chatContext.Provider
      value={{
        chatState: chatState,
        dispatchChat: dispatchChat,
        setChatroomsHandler: setChatroomsHandler,
        setMessagesHandler: setMessagesHandler,
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
}

export const useChatContext = () => {
  return useContext(chatContext);
};
