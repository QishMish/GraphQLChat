import React, { useState } from 'react'

import { GrEmoji } from 'react-icons/gr'
import { AiOutlineSend } from 'react-icons/ai'
import { MdAttachFile } from 'react-icons/md'

import styles from './styles.module.css'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SEND_NEW_MESSAGE } from '../../graphql/chat'
import { useParams } from 'react-router-dom'

const ChatInput = () => {

  const [message, setMessage] = useState("")

  const { chatroomId } = useParams()

  const [sendMessage, { data, loading, error }] = useMutation(SEND_NEW_MESSAGE, {
    variables: {
      chatroomId: chatroomId[chatroomId.length - 1],
      newMessageInput: {
        content: message
      }
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const sendNewMessageHandler = () => {
    if (message) {
      sendMessage(message)
      setMessage("")
    }
  }

  return (
    <div className={styles.chatInputContainer}>
      <div className={styles.leftControl}>
        <MdAttachFile className={styles.fileIcon} />
      </div>
      <input type="text" placeholder='Type a message' className={styles.chatInput} value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className={styles.rightControl}>
        <GrEmoji className={styles.emojiIcon} />
        <AiOutlineSend className={styles.sendIcon} onClick={sendNewMessageHandler} />
      </div>
    </div>
  )
}

export default ChatInput