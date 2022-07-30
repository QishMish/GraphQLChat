import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid';
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useAuthContext, useChatContext } from '../../context'
import { FETCH_CHATROOMS } from '../../graphql/chat'
import ChatSidebarHeader from '../chatSidebarHeader/Index'
import Loading from '../loading/Index'


import styles from './styles.module.css'

const ChatSidebar = () => {

	const { setChatroomsHandler, chatState: { chatrooms } } = useChatContext()
	const { userState: { user } } = useAuthContext()

	const [loadChatrooms, { called, loading, data }] = useLazyQuery(FETCH_CHATROOMS, {
		onCompleted: (data) => {
			setChatroomsHandler(data.fetchChatrooms)
		},
		onError: (error) => {
			console.log(error);
		}
	});

	useEffect(() => {
		loadChatrooms()
	}, [])

	


	const conversations = [
		{
			avatar: "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png",
			username: "John Doe",
			lastMessage: "good by darlin",
			lastMessageSent: "09:30",
			unSeenMessages: 3
		},
		{
			avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqBRf6IebusCtv_rsoHZ6rMDP5jtf2QH70czdsQVo-dx6JEHbbZz2g_KUnBEg0-ou2tcM&usqp=CAU",
			username: "Liza Cage",
			lastMessage: "good by darlin",
			lastMessageSent: "09:30",
			unSeenMessages: 1
		},
		{
			avatar: "https://cdn-icons-png.flaticon.com/512/194/194938.png",
			username: "Ana Maria",
			lastMessage: "good by darlin",
			lastMessageSent: "09:30",
			unSeenMessages: 0
		},
		{
			avatar: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
			username: "Stive bruce",
			lastMessage: "good by darlin",
			lastMessageSent: "09:30",
			unSeenMessages: 1
		},
	]
	return (
		<>
			{
				loading ? (
					<Loading />
				) : (
					<div className={styles.chatSidebar}>
						<ChatSidebarHeader />
						<div className={styles.chatSidebarBody}>
							<div className={styles.wrapper}>
								<div className={styles.search}>
									<input type="text" placeholder='Search' className={styles.searchInput} />
									<BiSearch className={styles.searchIcon} />
								</div>
								<div className={styles.conversations}>
									{
										chatrooms?.map((conversation, index) => {
											let param = conversation.type == "ONE_TO_ONE" ? conversation.users.find(u => Number(u.id) !== user.id).username : conversation.name

											// const manyToManyChatroom = chatrooms?.find((chatroom) => chatroom.name === param)
											// const oneToOneChatroom = chatrooms?.find((chatroom) => {
											// 	const found = chatroom?.users.find(u => u.username === param)
											// 	if (found) {
											// 		return found
											// 	}
											// })
											// const chatroomId = manyToManyChatroom ? manyToManyChatroom?.id : oneToOneChatroom?.id

											param = uuidv4().concat(conversation.id)
											return (
												<Link to={param} className={styles.conversation} key={index}>
													<div className={styles.left}>
														<img className={styles.avatar} src={conversation.avatar ? conversation.avatar : "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png"} alt={conversation.username} />
													</div>
													<div className={styles.center}>
														{/* <h3>{conversation.username}</h3> */}
														<div className={styles.users}>
															{
																conversation.users.map((participants, index) => {
																	if (user.id !== Number(participants.id)) {
																		return <h4 key={index}>{participants.username}</h4>
																	}
																})
															}
														</div>

														<span>{conversation.lastMessage ? conversation.lastMessage : "bye"}</span>
													</div>
													<div className={styles.right}>
														<span className={styles.lastMessageSentTime}>{conversation.lastMessageSent ? conversation.lastMessageSent : "21:01"}</span>
														<span className={conversation.unSeenMessages < 1 ? styles.none : styles.unSeenMessages}>{conversation.unSeenMessages ? conversation.unSeenMessages : 1}</span>
													</div>
												</Link>
											)
										})
									}
								</div>

							</div>
						</div>
					</div>
				)
			}
		</>

	)
}

export default ChatSidebar