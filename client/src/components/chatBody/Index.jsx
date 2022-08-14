import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext, useChatContext } from '../../context';
import { FETCH_CHATROOM_MESSAGES, SUBSCRIBE_TO_CHATROOM, SUBSCRIBE_TO_CHATROOM_MESSAGE_DELETION, SUBSCRIBE_TO_CHATROOM_NEW_MESSAGE_CREATION } from '../../graphql/chat';
import styles from './styeles.module.css'
import Message from '../message/Index';

const ChatBody = () => {

  const { chatState: { messages }, setMessagesHandler, deletedMessageHandler, addMessagesHandler, setCurrentChatroomHandler } = useChatContext()
  const { userState: { user } } = useAuthContext()
  const { chatroomId } = useParams();


  const [loadChatroomMessages, { called, loading }]
    = useLazyQuery(FETCH_CHATROOM_MESSAGES, {
      variables: {
        // chatroomId: chatroomId[chatroomId.length - 1]
        chatroomId: chatroomId
      },
      onCompleted: (data) => {
        setCurrentChatroomHandler(data.fetchChatroomMessages)
        setMessagesHandler(data.fetchChatroomMessages?.messages)
      },
      onError: (error) => {
        console.log(error);
      }
    });

  useEffect(() => {
    loadChatroomMessages()
  }, [loading])

  const { data, loading: subLoading } = useSubscription(
    SUBSCRIBE_TO_CHATROOM_NEW_MESSAGE_CREATION,
    {
      variables: {
        // chatroomId: chatroomId[chatroomId.length - 1]
        chatroomId: chatroomId
      },
      onSubscriptionData: (data) => {
        addMessagesHandler(data.subscriptionData.data.onNewMessageCreated);
      },
    }
  )
  const { data: deletedMessageData, loading: deletedMessageLoading } = useSubscription(
    SUBSCRIBE_TO_CHATROOM_MESSAGE_DELETION,
    {
      variables: {
        chatroomId: chatroomId[chatroomId.length - 1]
      },
      onSubscriptionData: (data) => {
        console.log(data.subscriptionData.data.onMessageDeleted);
        deletedMessageHandler(data.subscriptionData.data.onMessageDeleted)
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