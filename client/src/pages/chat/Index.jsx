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
import { FETCH_ACTIVE_USERS, SUBSCRIBE_TO_ACTIVE_USERS } from '../../graphql/chat';
import { useAuthContext, useChatContext } from '../../context';

const Chat = () => {

  const { sidebarState: { current } } = useSidebarContext()
  const { setActiveUsersHandler, addActiveUserHandler } = useChatContext()
  const { userState: { user } } = useAuthContext()

  const [loadActiveUsers, { _, __, ___ }] = useLazyQuery(
    FETCH_ACTIVE_USERS,
    {
      onCompleted: (data) => {
        setActiveUsersHandler(data.fetchActiveUsers)
      },
      onError: (error) => {
        console.log(error)
      }
    }
  );
  const { data: users, loading: userLoading } = useSubscription(
    SUBSCRIBE_TO_ACTIVE_USERS, {
    variables: {
      userId: user.id
    },
    onSubscriptionData: data => {
      const activeUsersData = data.subscriptionData.data.activeUsers?.filter(au => Number(au.id) !== Number(user.id))
      setActiveUsersHandler(activeUsersData)
    },
    onError: error => {
      console.log(error);
    },
  }
  );

  useEffect(() => {
    loadActiveUsers()
  }, [current])

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
