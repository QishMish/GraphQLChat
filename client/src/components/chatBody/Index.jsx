import { useQuery, useLazyQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext, useChatContext } from '../../context';
import { FETCH_CHATROOM_MESSAGES, SUBSCRIBE_TO_CHATROOM, SUBSCRIBE_TO_CHATROOM_MESSAGE_DELETION, SUBSCRIBE_TO_CHATROOM_NEW_MESSAGE_CREATION } from '../../graphql/chat';
import styles from './styeles.module.css'
import Message from '../message/Index';
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from '../loading/Index'
import { useState } from 'react';
import Spinner from '../../assets/spinner.png'

const ChatBody = () => {

  const { chatState: { messages, currentChatroom }, setMessagesHandler, resetMessagesHandler, addCurrentChatroomMessagesHandler, setLastMessageHandler, deletedMessageHandler, addMessagesHandler, setCurrentChatroomHandler } = useChatContext()
  const { userState: { user } } = useAuthContext()
  const { chatroomId } = useParams();

  const [items, setItems] = useState(Array.from({ length: 50 }))
  const [hasMore, setHasMore] = useState(true)

  const offset = useRef(1);
  const limit = useRef(10);


  const [loadChatroomMessages, { called, loading, _, fetchMore }]
    = useLazyQuery(FETCH_CHATROOM_MESSAGES, {
      variables: {
        chatroomId: chatroomId,
        limit: limit.current,
        offSet: offset.current
      },
      fetchPolicy: "cache-and-network",
      // fetchPolicy: 'network-only',
      // fetchPolicy: 'no-cache',
      // fetchPolicy: 'cache-only',
      onCompleted: (data) => {
        console.log("onclompleted")
        // setCurrentChatroomHandler(data.fetchChatroomMessages)
        // addCurrentChatroomMessagesHandler(data.fetchChatroomMessages)
        // setCurrentChatroomHandler(data.fetchChatroomMessages)
        // setMessagesHandler(data.fetchChatroomMessages?.messages)
      },
      onError: (error) => {
        console.log(error);
      }
    });

  useEffect(() => {
    offset.current = 1;
    // loadChatroomMessages()
    loadChatroomMessages({
      variables: {
        chatroomId: chatroomId,
        limit: limit.current,
        offSet: offset.current
      }
    }).then(({ data }) => {
      console.log(data);
      setCurrentChatroomHandler(data.fetchChatroomMessages)
      // addCurrentChatroomMessagesHandler(data.fetchChatroomMessages)
    })
  }, [chatroomId])

  const fetchMoreChatroomMessages = () => {
    if (!currentChatroom.hasMoreMessages) {
      console.log("No more messages")
      return
    }
    offset.current += 1;
    fetchMore({
      variables: {
        chatroomId: chatroomId,
        limit: limit.current,
        offSet: offset.current
      }
    }).then(({ data }) => {
      console.log(data)
      addCurrentChatroomMessagesHandler(data.fetchChatroomMessages)
    })
  }
  const { data, loading: subLoading } = useSubscription(
    SUBSCRIBE_TO_CHATROOM_NEW_MESSAGE_CREATION,
    {
      variables: {
        chatroomId: chatroomId
      },
      onSubscriptionData: (data) => {
        console.log(data.subscriptionData.data.onNewMessageCreated);
        addMessagesHandler(data.subscriptionData.data.onNewMessageCreated);
        setLastMessageHandler({
          chatroomId,
          lastMessage: data.subscriptionData.data.onNewMessageCreated.content
        })
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
    <div id="scrollableDiv" className={styles.chatBodyContainer}  >
      {
        loading ? <Loading /> : (
          currentChatroom?.messages?.length ? (
            <InfiniteScroll
              dataLength={currentChatroom?.messages?.length}
              next={fetchMoreChatroomMessages}
              hasMore={currentChatroom?.hasMoreMessages}
              loader={<div className={styles.spinnerContainer}>
                <img src={Spinner} alt="spinner" className={styles.spinner} />
              </div>}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
              inverse={true}
              endMessage={
                currentChatroom.messages.length > (
                  <p className={styles.endMessage}>
                    <b>No more messages</b>
                  </p>
                )
              }
              scrollableTarget="scrollableDiv"
            >
              {
                currentChatroom.messages && (currentChatroom?.messages?.map((message, index) => {
                  const loggedInUser = Number(message.author.id) === Number(user.id) ? true : false
                  const position = loggedInUser ? `${styles.message} ${styles.flexEnd}` : `${styles.message}`
                  return (
                    <div key={index}>
                      <Message message={message} key={index} position={position} />
                    </div>
                  )
                }))
              }
            </InfiniteScroll>
          ) : (
            <h1 className={styles.startConversation}>Start conversation</h1>
          )
        )}
    </div >
  )
}

export default ChatBody