import React from 'react'

import {BiSearch} from 'react-icons/bi'
import ChatSidebarHeader from '../chatSidebarHeader/Index'


import styles from './styles.module.css'

const ChatSidebar = () => {

    const conversations = [
        {
            avatar:"https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
            username:"John Doe",
            lastMessage:"good by darlin",
            lastMessageSent:"09:30",
            unSeenMessages:3
        },
        {
            avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBRf6IebusCtv_rsoHZ6rMDP5jtf2QH70czdsQVo-dx6JEHbbZz2g_KUnBEg0-ou2tcM&usqp=CAU",
            username:"Liza Cage",
            lastMessage:"good by darlin",
            lastMessageSent:"09:30",
            unSeenMessages:1
        },
        {
            avatar:"https://cdn-icons-png.flaticon.com/512/194/194938.png",
            username:"Ana Maria",
            lastMessage:"good by darlin",
            lastMessageSent:"09:30",
            unSeenMessages:0
        },
        {
            avatar:"https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
            username:"Stive bruce",
            lastMessage:"good by darlin",
            lastMessageSent:"09:30",
            unSeenMessages:1
        },
    ]

  return (
    <div className={styles.chatSidebar}>
        <ChatSidebarHeader />
        <div className={styles.chatSidebarBody}>
            <div className={styles.wrapper}>
                <div className={styles.search}>
                    <input type="text" placeholder='Search' className={styles.searchInput} />
                    <BiSearch className={styles.searchIcon}/>
                </div>
                <div className={styles.conversations}>
                    {
                        conversations.map((conversation, index)=>{
                            return (
                                <div className={styles.conversation} key={index}>
                                    <div className={styles.left}>
                                        <img className={styles.avatar} src={conversation.avatar} alt={conversation.username} />
                                    </div>
                                    <div className={styles.center}>
                                        <h3>{conversation.username}</h3>
                                        <span>{conversation.lastMessage}</span>
                                    </div>
                                    <div className={styles.right}>
                                        <span className={styles.lastMessageSentTime}>{conversation.lastMessageSent}</span>
                                        <span className={conversation.unSeenMessages < 1 ? styles.none : styles.unSeenMessages }>{conversation.unSeenMessages}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatSidebar