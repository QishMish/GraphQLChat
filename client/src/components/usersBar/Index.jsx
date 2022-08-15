import React from 'react';
import ChatSidebarHeader from '../chatSidebarHeader/Index';
import { BiSearch } from 'react-icons/bi';
import { HiStatusOnline } from 'react-icons/hi';
import styles from './styles.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery, useSubscription } from '@apollo/client';
import { FETCH_CHATROOMS, GET_CONVERSATION_BY_USERID_OR_CREATE, GET_USERS, SUBSUCRIBE_TO_NEW_USER_JOIN } from '../../graphql/chat';
import { useState } from 'react';
import { useAuthContext, useChatContext } from '../../context';

const UsersBar = () => {
  const {
    userState: { user },
  } = useAuthContext();
  const {
    chatState: { chatUsers, activeUsers },
    setChatUsersHandler,
    addActiveUserHandler
  } = useChatContext();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USERS, {
    onCompleted: data => {
      const exludeLogedInUser = data.getUsers
        .slice()
        .filter(u => Number(u.id) !== Number(user.id));
      setChatUsersHandler(exludeLogedInUser);
    },
    onError: error => {
      console.log(error);
    },
  });


  const [loadChatroomWithMessages, { _, __, ___ }] = useMutation(GET_CONVERSATION_BY_USERID_OR_CREATE, { refetchQueries: [{ query: FETCH_CHATROOMS }] }
  );

  const sendNewMessage = async (userId, memberId) => {
    const data = await loadChatroomWithMessages({ variables: { userId: Number(userId), memberId: Number(memberId) } })

    console.log(data);

    const chatroom = data.data.getConversationByUserIdsOrCreate
    console.log(chatroom)
    navigate(`/chat/${chatroom.id}`)
  }

  let previousChar = '';
  const usersList = chatUsers?.filter(u => Number(u.id) !== Number(user.id))
    ?.slice()
    .sort((a, b) => a.username.localeCompare(b.username))
    ?.map((u, i) => {
      const param = uuidv4().concat(u.id);
      const isActive = activeUsers?.find(au => Number(au.id) === Number(u.id))

      if (u.username.charAt(0) !== previousChar) {
        previousChar = u.username.charAt(0);
        return (
          <div key={i} onClick={() => sendNewMessage(user.id, u.id)}>
            <div>
              <div className={styles.albhabet} key={'c' + u.id}>
                {previousChar}
              </div>
            </div>
            <div className={styles.userList}>
              <div className={styles.username}>{u.username}</div>
              {isActive && <div className={styles.status}>
                <HiStatusOnline />
              </div>}
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.userList} key={i} onClick={() => sendNewMessage(user.id, u.id)}>
            <div className={styles.username}>{u.username}</div>
            {isActive && <div className={styles.status}>
              <HiStatusOnline />
            </div>}
          </div>
        );
      }
    });

  return <div className={styles.usersListContainer}>{usersList}</div>;
};

export default UsersBar;
