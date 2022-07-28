import React from 'react'


import styles from './styles.module.css'

const ChatSidebarHeader = () => {
  return (
    <div className={styles.chatSidebarHeader}>
        <img width={"25px"} className={styles.avatar} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar" />
        <div className={styles.content}>
            <h2>Mike Smith</h2>
            <span>@Mike</span>
        </div>
    </div>
  )
}

export default ChatSidebarHeader