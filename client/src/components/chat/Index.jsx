import React from 'react'
import ChatBody from '../chatBody/Index'
import ChatHeader from '../chatHeader/Index'
import ChatInput from '../chatInput/Index'

import styles from './styeles.module.css'

const Chat = () => {
    return (
        <div className={styles.chatComponentContainer}>
            <ChatHeader />
            <ChatBody />
            <ChatInput />
        </div>
    )
}

export default Chat