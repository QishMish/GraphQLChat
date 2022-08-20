import React, { useEffect } from "react";
import { HiStatusOnline } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  FETCH_CHATROOMS,
  GET_CONVERSATION_BY_USERID_OR_CREATE,
  GET_USERS,
} from "../../graphql/chat";
import { useAuthContext, useChatContext } from "../../context";

import styles from "./styles.module.css";

const UsersBar = () => {
  const {
    userState: { user },
  } = useAuthContext();
  const {
    chatState: { chatUsers, activeUsers, searchKeyword },
    setChatUsersHandler,
    setSeachKeywordHandler,
  } = useChatContext();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      const exludeLogedInUser = data.getUsers
        .slice()
        .filter((u) => Number(u.id) !== Number(user.id));
      setChatUsersHandler(exludeLogedInUser);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    setSeachKeywordHandler("");
  }, []);

  const [loadChatroomWithMessages, { _, __, ___ }] = useMutation(
    GET_CONVERSATION_BY_USERID_OR_CREATE,
    { refetchQueries: [{ query: FETCH_CHATROOMS }] }
  );

  const sendNewMessage = async (userId, memberId) => {
    const data = await loadChatroomWithMessages({
      variables: { userId: Number(userId), memberId: Number(memberId) },
    });
    const chatroom = data.data.getConversationByUserIdsOrCreate;
    navigate(`/chat/${chatroom.id}`);
  };

  let previousChar = "";
  const usersList = chatUsers
    ?.filter((c) =>
      c.username.toLowerCase()?.includes(searchKeyword.toLowerCase())
    )
    ?.filter((u) => Number(u.id) !== Number(user.id))
    ?.slice()
    .sort((a, b) => a.username.localeCompare(b.username))
    ?.map((u, i) => {
      const isActive = activeUsers?.find(
        (au) => Number(au.id) === Number(u.id)
      );

      if (u.username.charAt(0) !== previousChar) {
        previousChar = u.username.charAt(0);
        return (
          <div key={i} onClick={() => sendNewMessage(user.id, u.id)}>
            <div>
              <div className={styles.albhabet} key={"c" + u.id}>
                {previousChar}
              </div>
            </div>
            <div className={styles.userList}>
              <div className={styles.username}>{u.username}</div>
              {isActive && (
                <div className={styles.status}>
                  <HiStatusOnline />
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div
            className={styles.userList}
            key={i}
            onClick={() => sendNewMessage(user.id, u.id)}
          >
            <div className={styles.username}>{u.username}</div>
            {isActive && (
              <div className={styles.status}>
                <HiStatusOnline />
              </div>
            )}
          </div>
        );
      }
    });

  return <div className={styles.usersListContainer}>{usersList}</div>;
};

export default UsersBar;
