import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { MdAttachFile } from "react-icons/md";

import { useChatContext } from "../../context";
import { FETCH_CHATROOM_MESSAGES, SEND_NEW_MESSAGE } from "../../graphql/chat";

import styles from "./styles.module.css";

const ChatInput = () => {
  const { chatroomId } = useParams();

  const { setLastMessageHandler } = useChatContext();

  const [message, setMessage] = useState("");
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

  const [sendMessage] = useMutation(SEND_NEW_MESSAGE, {
    variables: {
      chatroomId: chatroomId,
      newMessageInput: {
        content: message,
      },
    },
    refetchQueries: FETCH_CHATROOM_MESSAGES,
  });

  const sendNewMessageHandler = () => {
    if (message) {
      setIsOpenEmoji(false);
      sendMessage(message);
      setMessage("");
      setLastMessageHandler({
        chatroomId,
        lastMessage: message,
      });
    }
    return;
  };
  const onEmojiClick = (event, emojiObject) => {
    setMessage((prev) => prev.concat(emojiObject.emoji));
  };

  return (
    <div className={styles.chatInputContainer}>
      <div className={styles.leftControl}>
        <MdAttachFile className={styles.fileIcon} />
      </div>
      <input
        type="text"
        placeholder="Type a message"
        className={styles.chatInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className={styles.rightControl}>
        <div className={isOpenEmoji ? `${styles.show}` : `${styles.none}`}>
          <div className={styles.picker}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <BsEmojiSmile
          className={styles.emojiIcon}
          onClick={() => setIsOpenEmoji(!isOpenEmoji)}
        />
        <AiOutlineSend
          className={styles.sendIcon}
          onClick={sendNewMessageHandler}
        />
      </div>
    </div>
  );
};

export default ChatInput;
