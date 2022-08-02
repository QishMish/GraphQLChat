import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import {
  addMessage,
  handleDeletedMessage,
  setChatrooms,
  setChatUsers,
  setCurrentChatroom,
  setMessages,
} from "./chatActions";
import { SET_CHATROOMS, SET_MESSAGES } from "./chatConstants";
import { chatReducer } from "./chatReducer";

const chatContext = createContext();

const CHAT_INITIAL_STATE = {
  chatrooms: [],
  currentChatroom: {},
  messages: [],
  chatUsers: [],
};

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
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
}

export const useChatContext = () => {
  return useContext(chatContext);
};
