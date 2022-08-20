import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { AiFillCloseSquare } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useAuthContext, useChatContext } from "../../context";
import {
    FETCH_CHATROOM_MESSAGES,
    REMOVE_CHAT_ROOMGROUP_MEMBERS,
} from "../../graphql/chat";

import styles from "./styles.module.css";

const MembersModal = ({ setMembersModalIsOpen }) => {
  let navigate = useNavigate();

  const [userSearch, setUserSearch] = useState("");
  const {
    chatState: { currentChatroom },
  } = useChatContext();
  const {
    userState: { user },
  } = useAuthContext();

  const [removeMembers] = useMutation(REMOVE_CHAT_ROOMGROUP_MEMBERS, {
    refetchQueries: FETCH_CHATROOM_MESSAGES,
  });

  const isAdminOrModerator =
    user?.roles?.includes("ADMIN") || user?.roles?.includes("MODEARTOR");

  const navigateToChat = (url) => {
    setMembersModalIsOpen(false);
    navigate(url);
  };

  const removeChatroomMembersHandler = (data) => {
    removeMembers(data);
  };

  return (
    <div className={styles.membersModal}>
      <AiFillCloseSquare
        className={styles.closeIcon}
        onClick={() => setMembersModalIsOpen(false)}
      />
      <input
        type="text"
        placeholder="Search for users"
        name="userSearch"
        id="userSearch"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
      />
      <div className={styles.usersList}>
        {currentChatroom?.users
          ?.filter((u) =>
            u.username.toLowerCase().includes(userSearch.toLowerCase())
          )
          .map((u) => {
            return (
              <div className={styles.user} key={u.id}>
                <div
                  className={styles.left}
                  onClick={() => navigateToChat(`/chat/${u.id}`)}
                >
                  <div className={styles.avatar}>
                    <img width={"20px"} src={u.profile_img} alt="avatar" />
                  </div>
                  <div className={styles.username}>{u.username}</div>
                </div>
                <div className={styles.right}>
                  {isAdminOrModerator && (
                    <IoIosRemoveCircle
                      className={styles.removeUserIcon}
                      onClick={() =>
                        removeChatroomMembersHandler({
                          variables: {
                            userId: user.id,
                            chatroomId: currentChatroom.id,
                            removeChatRoomGroupMemberInput: [
                              {
                                id: u.id,
                                username: u.username,
                              },
                            ],
                          },
                        })
                      }
                    />
                  )}

                  <BsDot className={styles.activeStatusIcon} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MembersModal;
