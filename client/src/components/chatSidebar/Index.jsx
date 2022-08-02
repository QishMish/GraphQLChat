import React, { useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { CREATE_CHATROOM, FETCH_CHATROOMS, GET_USERS } from '../../graphql/chat'
import { useAuthContext, useChatContext } from '../../context'

//components
import Loading from '../loading/Index'

//icons
import { MdGroups, MdDoneOutline } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { IoCreateOutline } from 'react-icons/io5'

import styles from './styles.module.css'

const ChatSidebar = () => {

	const [addChatRoomModalIsOpen, setAddChatRoomModalIsOpen] = useState(false)
	const [chatroomName, setChatroomName] = useState("")
	const [selectedUsers, setSelectedUsers] = useState([])


	const { setChatroomsHandler, setChatUsersHandler, chatState: { chatrooms, chatUsers } } = useChatContext()
	const { userState: { user } } = useAuthContext()

	const { loading, error, data } = useQuery(FETCH_CHATROOMS, {
		onCompleted: (data) => {
			console.log(data);
			setChatroomsHandler(data.fetchChatrooms)
		},
		onError: (error) => {
			console.log(error);
		}
	});
	const [loadUsers, { called, loading: loadUsersLoading, data: loadUsersData }] = useLazyQuery(
		GET_USERS, {
		onCompleted: (data) => {
			console.log(data);
			setChatUsersHandler(data.getUsers)
		},
	}
	);
	const [createChatroom, { data: createChatroomData, loading: createChatroomLoading, error: createChatroomError }] = useMutation(CREATE_CHATROOM, { refetchQueries: [{ query: FETCH_CHATROOMS }] });


	const setAddChatRoomModalIsOpenHandler = () => {
		setAddChatRoomModalIsOpen((prev) => !prev)
		if (!chatUsers.length) {
			loadUsers()
		}
	}
	const selectUserHandler = (e) => {
		const id = e.target.id
		const username = e.target.value

		const exist = selectedUsers.find(u => u.id === id)

		if (exist) return discardUserHandler(exist.id)

		setSelectedUsers((prev) => {
			return [
				...prev,
				{
					id: id,
					username: username,
				}
			]
		})
	}
	const discardUserHandler = (id) => setSelectedUsers(selectedUsers.filter(item => Number(item.id) !== Number(id)))

	const completeChatroomCreation = () => {
		if (!chatroomName) {
			return
		}
		createChatroom({
			variables: {
				createChatroomGroupInput: {
					name: chatroomName,
					type: "MANY_TO_MANY",
					members: selectedUsers
				}
			}
		})
		selectedUsers([])
		setChatroomName("")
		setAddChatRoomModalIsOpen(false)
	}

	return (
		<>
			<div className={styles.chatroomGroup}>
				<IoCreateOutline className={styles.createChatroomGroup} onClick={setAddChatRoomModalIsOpenHandler} />
			</div>
			{
				addChatRoomModalIsOpen && (
					<div className={styles.addChatroomOptions}>
						<input type="text" placeholder='name' name="name" id="name" value={chatroomName} onChange={(e) => setChatroomName(e.target.value)} />
						<div className={styles.optionsList}>
							{
								loadUsersLoading && <p>...</p>
							}
							{
								chatUsers?.map((u, i) => {
									return (
										<div className={styles.user} key={i}>
											<input type="checkbox" id={u.id} name="user" onChange={selectUserHandler} value={u.username} />
											<label htmlFor="user1">{u.username}</label>
										</div>
									)
								})
							}
						</div>
						<div className={styles.completeChatroomCreation} onClick={completeChatroomCreation}>
							<MdDoneOutline />
						</div>
					</div>
				)
			}

			{
				loading ? (
					<Loading />
				) : (
					// <div className={styles.chatSidebar}>
					// 	<ChatSidebarHeader />
					// 	<div className={styles.chatSidebarBody}>
					// 		<div className={styles.wrapper}>
					// 			<div className={styles.search}>
					// 				<input type="text" placeholder='Search' className={styles.searchInput} />
					// 				<BiSearch className={styles.searchIcon} />
					// 			</div>
					<div className={styles.conversations}>
						{
							chatrooms?.map((conversation, index) => {
								let param = conversation.type == "ONE_TO_ONE" ? conversation.users.find(u => Number(u.id) !== user.id)?.username : conversation.name

								// const manyToManyChatroom = chatrooms?.find((chatroom) => chatroom.name === param)
								// const oneToOneChatroom = chatrooms?.find((chatroom) => {
								// 	const found = chatroom?.users.find(u => u.username === param)
								// 	if (found) {
								// 		return found
								// 	}
								// })
								// const chatroomId = manyToManyChatroom ? manyToManyChatroom?.id : oneToOneChatroom?.id

								param = uuidv4().concat(conversation.id)
								const conversationSlug = conversation.type === "MANY_TO_MANY" ? `Chatroom:${conversation.name}` : conversation.users.find(u => Number(u.id) !== user.id)?.username

								return (
									<Link to={param} className={styles.conversation} key={index}>
										<div className={styles.left}>
											<img className={styles.avatar} src={conversation.avatar ? conversation.avatar : "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png"} alt={conversation.username} />
										</div>
										<div className={styles.center}>
											{/* <h3>{conversation.username}</h3> */}
											<div className={styles.users}>
												{/* {
													conversation.users.map((participants, index) => {
														if (user.id !== Number(participants.id)) {
															// const dot = conversation.users.length > 2 ? true : false
															return <h4 key={index}>{`${participants.username}`}</h4>
														}
													})
												} */}
												<h4>
													{conversationSlug}
												</h4>
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

					// 		</div>
					// 	</div>
					// </div>
				)
			}
		</>

	)
}

export default ChatSidebar