import React, { useEffect } from 'react';
import ChatSidebar from '../../components/chatSidebar/Index';
import SideBar from '../../components/sidebar/Index';
import ChatComponent from '../../components/chat/Index';

import styles from './styles.module.css';
import { Outlet } from 'react-router-dom';
import UsersBar from '../../components/usersBar/Index';
import ChatSidebarLayout from '../../components/chatSidebarLayout';
import { useSidebarContext } from '../../context/sidebarContext/sidebarContext';
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { FETCH_ACTIVE_USERS, SUBSUCRIBE_TO_NEW_USER_JOIN } from '../../graphql/chat';
import { useChatContext } from '../../context';

const Chat = () => {

  const { sidebarState: { current } } = useSidebarContext()
  const { setActiveUsersHandler, addActiveUserHandler } = useChatContext()


  const [loadActiveUsers, { _, __, ___ }] = useLazyQuery(
    FETCH_ACTIVE_USERS,
    {
      onCompleted: (data) => {
        console.log(data.fetchActiveUsers)
        setActiveUsersHandler(data.fetchActiveUsers)
      },
      onError: (error) => {
        console.log(error)
      }
    }
  );
  const { data: users, loading: userLoading } = useSubscription(
    SUBSUCRIBE_TO_NEW_USER_JOIN, {
    onSubscriptionData: data => {
      console.log(data);
      // setActiveUsersHandler(data.fetchActiveUsers)
      console.log(data.subscriptionData.data.activeUsers)
      setActiveUsersHandler(data.subscriptionData.data.activeUsers)
    },
    onError: error => {
      console.log(error);
    },
  }
  );

  useEffect(() => {
    loadActiveUsers()
  }, [])



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
