import { useQuery, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext, useChatContext } from '../../context';
import { FETCH_CHATROOM_MESSAGES } from '../../graphql/chat';
import moment from "moment"
import styles from './styeles.module.css'

// const messages = [
//   {
//     content: "hi there",
//     avatar: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
//     time: "02.43",
//     author: "mike",

//   },
//   {
//     content: "hi",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "21.32",
//     author: "john",

//   },
//   {
//     content: "how are you? i have not seen you for ages mate, what happened with you",
//     avatar: "https://cdn-icons-png.flaticon.com/512/147/147142.png",
//     time: "01.31",
//     author: "mike",

//   },
//   {
//     content: "oh,",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "09.03",
//     author: "john",

//   },
//   {
//     content: "it's long story, i am fine, you?",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "05.11",
//     author: "john",

//   },
//   {
//     content: "oh,",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "09.03",
//     author: "mike",
//   },
//   {
//     content: "it's long story, i am fine, you?",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "05.11",
//     author: "mike",
//   },
//   {
//     content: "oh,",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "09.03",
//     author: "john",

//   },
//   {
//     content: "it's long story, i am fine, you?",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "05.11",
//     author: "mike",

//   },
//   {
//     content: "oh,",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "09.03",
//     author: "mike",

//   },
//   {
//     content: "it's long story, i am fine, you?",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "05.11",
//     author: "john",

//   },
//   {
//     content: "oh,",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "09.03",
//     author: "mike",

//   },
//   {
//     content: "it's long story, i am fine, you?",
//     avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
//     time: "05.11",
//     author: "john",
//   },
// ]


const ChatBody = () => {

  const { chatState: { messages }, setMessagesHandler } = useChatContext()
  const { userState: { user } } = useAuthContext()
  const { chatroomId } = useParams();


  const [loadChatroomMessages, { called, loading, data }]
    = useLazyQuery(FETCH_CHATROOM_MESSAGES, {
      variables: {
        chatroomId: chatroomId[chatroomId.length - 1]
      },
      onCompleted: (data) => {
        console.log(data);
        setMessagesHandler(data.fetchChatroomMessages.messages)
      },
      onError: (error) => {
        console.log(error);
      }
    });

  useEffect(() => {
    loadChatroomMessages()
  }, [])



  return (
    <div className={styles.chatBodyContainer}>
      {
        messages.map((message, index) => {
          const loggedInUser = Number(message.author.id) === Number(user.id) ? true : false
          const position = loggedInUser ? `${styles.message} ${styles.flexEnd}` : `${styles.message}`
          return (
            <div className={position} key={index}>
              <div className={styles.col}>
                <div className={styles.left}>
                  <img src={message.avatar ? messages.avatar : "https://cdn-icons-png.flaticon.com/512/147/147142.png"} className={styles.avatar} alt="user avatar" />
                </div>
                <div className={styles.right}>
                  <div className={styles.content}>
                    {message.content}
                  </div>
                  <span className={styles.time}>
                    {
                      moment(message.createdAt).startOf("min").fromNow()
                    }
                  </span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ChatBody