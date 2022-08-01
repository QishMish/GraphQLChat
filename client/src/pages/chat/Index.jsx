import React from 'react';
import ChatSidebar from '../../components/chatSidebar/Index';
import SideBar from '../../components/sidebar/Index';
import ChatComponent from '../../components/chat/Index';

import styles from './styles.module.css';
import { Outlet } from 'react-router-dom';
import UsersBar from '../../components/usersBar/Index';
import ChatSidebarLayout from '../../components/chatSidebarLayout';
import { useSidebarContext } from '../../context/sidebarContext/sidebarContext';

const Chat = () => {

  const { sidebarState: { current } } = useSidebarContext()

  const getElement = (el) => {
    switch (el) {
      case "conversations":
        return <ChatSidebar />
      case "users":
        return <UsersBar />
      default:
        return <ChatSidebar />;
    }
  };

  return (
    <div className={styles.chatContainer}>
      <SideBar />
      <ChatSidebarLayout>
        {getElement(current)}
      </ChatSidebarLayout>
      <Outlet />
    </div>
  );
};

export default Chat;
