import React, { useContext, createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

import {
  addActiveUser,
  addMessage,
  handleDeletedMessage,
  resetContext,
  setActiveUsers,
  setChatrooms,
  setSeachKeyword,
  setChatUsers,
  setCurrentChatroom,
  setLastMessage,
  setMessages,
  addCurrentChatroomMessages,
  resetMessages,
} from "./chatActions";
import { chatReducer } from "./chatReducer";

const chatContext = createContext();

let CHAT_INITIAL_STATE = {
  chatrooms: [],
  currentChatroom: {},
  messages: [],
  chatUsers: [],
  activeUsers: [],
  searchKeyword: "",
};

const accessToken = localStorage.getItem("access_token");

if (accessToken) {
  const decoded = jwtDecode(accessToken);

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("access_token");
  }
} else {
  CHAT_INITIAL_STATE = {
    chatrooms: [],
    currentChatroom: {},
    messages: [],
    chatUsers: [],
    activeUsers: [],
    searchKeyword: "",
  };
}

export default function ChatProvider(props) {
  const [chatState, dispatchChat] = useReducer(chatReducer, CHAT_INITIAL_STATE);

  const setChatroomsHandler = (chatrooms) => {
    dispatchChat(setChatrooms(chatrooms));
  };
  const setMessagesHandler = (messages) => {
    dispatchChat(setMessages(messages));
  };
  const addMessagesHandler = (message) => {
    dispatchChat(addMessage(message));
  };
  const setChatUsersHandler = (users) => {
    dispatchChat(setChatUsers(users));
  };
  const setCurrentChatroomHandler = (chatroom) => {
    dispatchChat(setCurrentChatroom(chatroom));
  };
  const deletedMessageHandler = (message) => {
    dispatchChat(handleDeletedMessage(message));
  };
  const setActiveUsersHandler = (users) => {
    dispatchChat(setActiveUsers(users));
  };
  const addActiveUserHandler = (user) => {
    dispatchChat(addActiveUser(user));
  };
  const resetContextHandler = () => {
    dispatchChat(resetContext());
  };
  const setLastMessageHandler = (message) => {
    dispatchChat(setLastMessage(message));
  };
  const setSeachKeywordHandler = (message) => {
    dispatchChat(setSeachKeyword(message));
  };
  const addCurrentChatroomMessagesHandler = (messages) => {
    dispatchChat(addCurrentChatroomMessages(messages));
  };
  const resetMessagesHandler = () => {
    dispatchChat(resetMessages());
  };
  return (
    <chatContext.Provider
      value={{
        chatState: chatState,
        dispatchChat: dispatchChat,
        setChatroomsHandler: setChatroomsHandler,
        setMessagesHandler: setMessagesHandler,
        addMessagesHandler: addMessagesHandler,
        setChatUsersHandler: setChatUsersHandler,
        setCurrentChatroomHandler: setCurrentChatroomHandler,
        deletedMessageHandler: deletedMessageHandler,
        setActiveUsersHandler: setActiveUsersHandler,
        addActiveUserHandler: addActiveUserHandler,
        resetContextHandler: resetContextHandler,
        setLastMessageHandler: setLastMessageHandler,
        setSeachKeywordHandler: setSeachKeywordHandler,
        addCurrentChatroomMessagesHandler: addCurrentChatroomMessagesHandler,
        resetMessagesHandler: resetMessagesHandler,
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
}

export const useChatContext = () => {
  return useContext(chatContext);
};
