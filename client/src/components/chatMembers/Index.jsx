import React, { useState } from 'react'

import { AiFillCloseSquare } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useChatContext } from '../../context'
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.css'


const MembersModal = ({ setMembersModalIsOpen }) => {
    const [userSearch, setUserSearch] = useState("")
    const { chatState: { currentChatroom } } = useChatContext()
    let navigate = useNavigate();


    const navigateToChat = (url) => {
        setMembersModalIsOpen(false)
        navigate(url);
    }

    return (
        <div className={styles.membersModal}>
            <AiFillCloseSquare className={styles.closeIcon} onClick={() => setMembersModalIsOpen(false)} />
            <input type="text" placeholder='Search for users' name="userSearch" id="userSearch" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
            <div className={styles.usersList}>
                {
                    currentChatroom?.users?.filter(u => u.username.toLowerCase().includes(userSearch.toLowerCase())).map((u) => {
                        const param = uuidv4()
                        return (
                            <div onClick={() => navigateToChat(`/chat/${param}${u.id}`)} className={styles.user} key={u.id}>
                                <div className={styles.left}>
                                    <div className={styles.avatar}>
                                        <img width={"20px"} src={u.profile_img} alt="avatar" />
                                    </div>
                                    <div className={styles.username}>
                                        {u.username}
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <BsDot />
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </div>
    )
}

export default MembersModal