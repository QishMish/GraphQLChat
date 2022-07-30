import React from 'react';
import ChatSidebar from '../../components/chatSidebar/Index';
import SideBar from '../../components/sidebar/Index';
import ChatComponent from '../../components/chat/Index';

import styles from './styles.module.css';
import { Outlet } from 'react-router-dom';

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <SideBar />
      <ChatSidebar />
      {/* <ChatComponent /> */}
      <Outlet />
    </div>
  );
};

export default Chat;
