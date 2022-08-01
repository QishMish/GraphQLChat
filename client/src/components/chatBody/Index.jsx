import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext, useChatContext } from '../../context';
import { FETCH_CHATROOM_MESSAGES, SUBSCRIBE_TO_CHATROOM } from '../../graphql/chat';
import styles from './styeles.module.css'
import Message from '../message/Index';

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

  const { chatState: { messages }, setMessagesHandler, addMessagesHandler } = useChatContext()
  const { userState: { user } } = useAuthContext()
  const { chatroomId } = useParams();



  const [loadChatroomMessages, { called, loading }]
    = useLazyQuery(FETCH_CHATROOM_MESSAGES, {
  variables: {
    chatroomId: chatroomId[chatroomId.length - 1]
  },
  onCompleted: (data) => {
    setMessagesHandler(data.fetchChatroomMessages.messages)
  },
  onError: (error) => {
    console.log(error);
  }
    });

  useEffect(() => {
    loadChatroomMessages()

  }, [loading])

  const { data, loading: subLoading } = useSubscription(
    SUBSCRIBE_TO_CHATROOM,
    {
      variables: {
        chatroomId: chatroomId[chatroomId.length - 1]
      },
      onSubscriptionData: (data) => {
        console.log(data);
        addMessagesHandler(data.subscriptionData.data.onNewMessageCreated);
      },
    }
  )

  return (
    <div className={styles.chatBodyContainer}>
      {
        messages?.map((message, index) => {
          const loggedInUser = Number(message.author.id) === Number(user.id) ? true : false
          const position = loggedInUser ? `${styles.message} ${styles.flexEnd}` : `${styles.message}`
          return <Message message={message} key={index} position={position} />
        })
      }
    </div>
  )
}

export default ChatBody