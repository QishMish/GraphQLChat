import React, { useState, useEffect } from 'react'
import moment from "moment"

import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'

import styles from './styles.module.css'
import { useMutation } from '@apollo/client'
import { DELETE_MESSAGE, FETCH_CHATROOM_MESSAGES } from '../../graphql/chat'
import { useAuthContext } from '../../context'

const Message = ({ message, position, index }) => {

    const { userState: { user } } = useAuthContext()

    const [optionModalOpen, setOptionModalOpen] = useState(false)

    const [deleteMessage, { data, loading, error }] = useMutation(DELETE_MESSAGE, {
        refetchQueries: FETCH_CHATROOM_MESSAGES
    });


    useEffect(() => {
        document.body.addEventListener('click', resetOptionModalState);
        return () => {
            window.removeEventListener('click', resetOptionModalState);
        }
    }, []);

    const resetOptionModalState = (e) => {
        if (e.target.id !== "option" && e.target.id !== "remove") {
            setOptionModalOpen(false)
        }
    }

    const messageDeleteHandler = ({ id, authorId }) => {
        console.log("message deleted", id);
        if (!Number(authorId) === Number(user.id)) {
            return
        }
        deleteMessage({
            variables: {
                messageId: id
            }
        })
        setOptionModalOpen(false)
    }
    return (
        <div className={position} key={index}>
            <div className={styles.col}>
                <div className={styles.left}>
                    <img src={message.avatar ? message.avatar : "https://cdn-icons-png.flaticon.com/512/147/147142.png"} className={styles.avatar} alt="user avatar" />
                </div>
                <div className={styles.right}>
                    <div className={styles.content}>
                        {message.content}
                    </div>
                    <div className={styles.options}>
                        <BsEmojiSmile className={styles.optionIcon} />
                        <BiDotsVerticalRounded id='option' className={styles.optionIcon} onClick={() => setOptionModalOpen((prev) => !prev)} />
                    </div>
                    <div className={optionModalOpen ? `${styles.optionProps}` : `${styles.optionProps} ${styles.none}`}>
                        <span id="remove" onClick={() => messageDeleteHandler({
                            id: message.id,
                            authorId: message.author_id
                        })} >remove</span>
                    </div>
                    <span className={styles.time}>
                        {
                            moment(new Date(message.createdAt * 1)).startOf("min").fromNow()
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Message
