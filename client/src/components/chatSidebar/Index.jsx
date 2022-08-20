import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import moment from "moment";
import { MdDoneOutline } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { RiDeleteBack2Line } from "react-icons/ri";

import {
  CREATE_CHATROOM,
  DELETE_CONVERSATION,
  FETCH_CHATROOMS,
  GET_USERS,
} from "../../graphql/chat";
import { useAuthContext, useChatContext } from "../../context";
import Loading from "../loading/Index";

import styles from "./styles.module.css";

const ChatSidebar = () => {
  const [addChatRoomModalIsOpen, setAddChatRoomModalIsOpen] = useState(false);
  const [chatroomName, setChatroomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {
    setChatroomsHandler,
    setChatUsersHandler,
    setSeachKeywordHandler,
    chatState: { chatrooms, chatUsers, searchKeyword },
  } = useChatContext();
  const {
    userState: { user },
  } = useAuthContext();

  const { loading, error, data, refetch } = useQuery(FETCH_CHATROOMS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setChatroomsHandler(data.fetchChatrooms);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [
    loadUsers,
    { called, loading: loadUsersLoading, data: loadUsersData },
  ] = useLazyQuery(GET_USERS, {
    onCompleted: (data) => {
      setChatUsersHandler(data.getUsers);
    },
  });
  const [createChatroom] = useMutation(CREATE_CHATROOM, {
    onCompleted: (data) => {
      refetch();
    },
  });
  const [deleteConversation] = useMutation(DELETE_CONVERSATION, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const setAddChatRoomModalIsOpenHandler = () => {
    setAddChatRoomModalIsOpen((prev) => !prev);
    if (!chatUsers.length) {
      loadUsers();
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setSeachKeywordHandler("");
  }, []);

  const selectUserHandler = (e) => {
    const id = e.target.id;
    const username = e.target.value;

    const exist = selectedUsers.find((u) => u.id === id);

    if (exist) return discardUserHandler(exist.id);

    setSelectedUsers((prev) => {
      return [
        ...prev,
        {
          id: id,
          username: username,
        },
      ];
    });
  };
  const discardUserHandler = (id) =>
    setSelectedUsers(
      selectedUsers.filter((item) => Number(item.id) !== Number(id))
    );
  const completeChatroomCreation = () => {
    if (!chatroomName) {
      return;
    }
    createChatroom({
      variables: {
        createChatroomGroupInput: {
          name: chatroomName,
          type: "MANY_TO_MANY",
          members: selectedUsers,
        },
      },
    });
    setSelectedUsers([]);
    setChatroomName("");
    setAddChatRoomModalIsOpen(false);
  };
  return (
    <>
      <div className={styles.chatroomGroup}>
        <IoCreateOutline
          className={styles.createChatroomGroup}
          onClick={setAddChatRoomModalIsOpenHandler}
        />
      </div>
      {addChatRoomModalIsOpen && (
        <div className={styles.addChatroomOptions}>
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            value={chatroomName}
            onChange={(e) => setChatroomName(e.target.value)}
          />
          <div className={styles.optionsList}>
            {loadUsersLoading && <p>...</p>}
            {chatUsers
              ?.filter((u) => Number(u.id) !== Number(user.id))
              ?.map((u, i) => {
                return (
                  <div className={styles.user} key={i}>
                    <input
                      type="checkbox"
                      id={u.id}
                      name="user"
                      onChange={selectUserHandler}
                      value={u.username}
                    />
                    <label htmlFor="user1">{u.username}</label>
                  </div>
                );
              })}
          </div>
          <div
            className={styles.completeChatroomCreation}
            onClick={completeChatroomCreation}
          >
            <MdDoneOutline />
          </div>
        </div>
      )}
      {loadUsersLoading ? (
        <Loading />
      ) : (
        <div className={styles.conversations}>
          {chatrooms
            ?.filter((c) => {
              if (c.type === "ONE_TO_ONE" && c.last_message == null) {
                return false;
              }
              return true;
            })
            ?.filter((c) =>
              c.slug.toLowerCase()?.includes(searchKeyword.toLowerCase())
            )
            ?.map((conversation, index) => {
              const conversationSlug =
                conversation.type === "MANY_TO_MANY"
                  ? `Chatroom:${conversation.name}`
                  : conversation.users.find((u) => Number(u.id) !== user.id)
                      ?.username;
              return (
                <Link
                  to={conversation.id}
                  className={styles.conversation}
                  key={index}
                >
                  <div className={styles.left}>
                    <img
                      className={styles.avatar}
                      src={
                        conversation.avatar
                          ? conversation.avatar
                          : "https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png"
                      }
                      alt={conversation.username}
                    />
                  </div>
                  <div className={styles.center}>
                    <div className={styles.users}>
                      <h4>{conversationSlug}</h4>
                    </div>
                    <span>
                      {conversation.last_message
                        ? conversation.last_message
                        : ""}
                    </span>
                  </div>
                  <div className={styles.right}>
                    <RiDeleteBack2Line
                      className={styles.removeChatroomIcon}
                      onClick={() =>
                        deleteConversation({
                          variables: {
                            chatroomId: conversation.id,
                          },
                        })
                      }
                    />
                    <span className={styles.lastMessageSentTime}>
                      {conversation.last_message_sent
                        ? moment(new Date(conversation.last_message_sent * 1))
                            .startOf("min")
                            .fromNow()
                        : ""}
                    </span>
                    <span
                      className={
                        conversation.unSeenMessages < 1
                          ? styles.none
                          : styles.unSeenMessages
                      }
                    >
                      {conversation.unSeenMessages
                        ? conversation.unSeenMessages
                        : 1}
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
