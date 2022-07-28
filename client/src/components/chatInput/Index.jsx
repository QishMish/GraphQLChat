import React from 'react'

import {GrEmoji} from 'react-icons/gr'
import {AiOutlineSend} from 'react-icons/ai'
import {MdAttachFile} from 'react-icons/md'

import styles from './styles.module.css'

const ChatInput = () => {
  return (
    <div className={styles.chatInputContainer}>
        <div className={styles.leftControl}>
            <MdAttachFile className={styles.fileIcon}/>
        </div>
        <input type="text" placeholder='Type a message' className={styles.chatInput} />
        <div className={styles.rightControl}>
            <GrEmoji className={styles.emojiIcon}/>
            <AiOutlineSend className={styles.sendIcon}/>
        </div>
    </div>
  )
}

export default ChatInput