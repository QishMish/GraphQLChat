import { useSubscription } from "@apollo/client";
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { SUBSUCRIBE_TO_NEW_USER_JOIN } from "../../graphql/chat";
import jwtDecode from "jwt-decode";
import {
  addActiveUser,
  addMessage,
  handleDeletedMessage,
  resetContext,
  setActiveUsers,
  setChatrooms,
  setChatUsers,
  setCurrentChatroom,
  setMessages,
} from "./chatActions";
import { SET_CHATROOMS, SET_MESSAGES } from "./chatConstants";
import { chatReducer } from "./chatReducer";

const chatContext = createContext();

let CHAT_INITIAL_STATE = {
  chatrooms: [],
  currentChatroom: {},
  messages: [],
  chatUsers: [],
  activeUsers: [],
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
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
}

export const useChatContext = () => {
  return useContext(chatContext);
};
