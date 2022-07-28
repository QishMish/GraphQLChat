import React from 'react'

import {BsThreeDots} from 'react-icons/bs'

import styles from './styles.module.css'

const ChatHeader = () => {
  return (
    <div className={styles.chatHeaderContainer}>
     <div className={styles.col}>
       <div className={styles.left}>
            <div>
                <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar" />
            </div>
            <h3 className={styles.username}>
              Mike Smith
            </h3>
        </div>
        <div className={styles.right}>
            <BsThreeDots />
        </div>
      </div>
      <div className={styles.col}>
         <ul className={styles.filter}>
          <li className={`${styles.filterItem} ${styles.active}`}>Conversations</li>
          <li className={styles.filterItem}>Media</li>
          <li className={styles.filterItem}>Files</li>
         </ul>
      </div>
    </div>
  )
}

export default ChatHeader