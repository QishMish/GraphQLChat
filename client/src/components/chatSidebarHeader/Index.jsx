import React from 'react';
import { useAuthContext } from '../../context';

import styles from './styles.module.css';

const ChatSidebarHeader = () => {
  const {
    userState
  } = useAuthContext();
  return (
    <div className={styles.chatSidebarHeader}>
      <img
        width={'25px'}
        className={styles.avatar}
        src='https://cdn-icons-png.flaticon.com/512/147/147142.png'
        alt='avatar'
      />
      <div className={styles.content}>
        <h2>{userState.user.username}</h2>
        <span>{userState.user.email}</span>
      </div>
    </div>
  );
};

export default ChatSidebarHeader;
