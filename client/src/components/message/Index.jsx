import React, { useState, useEffect } from 'react'
import moment from "moment"

import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'

import styles from './styles.module.css'

const Message = ({ message, position, index }) => {
    const [optionModalOpen, setOptionModalOpen] = useState(false)


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

    const messageDeleteHandler = (id) => {
        console.log("message deleted", id);
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
                        <span id="remove" onClick={() => messageDeleteHandler(message.id)} >remove</span>
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
