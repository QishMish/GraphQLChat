import React from 'react'

import { useAuthContext, useChatContext } from '../../context'

import { BsThreeDots } from 'react-icons/bs'
import { MdGroups } from 'react-icons/md'
import { AiFillCloseSquare } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'

import styles from './styles.module.css'
import { useState } from 'react'
import MembersModal from '../chatMembers/Index'

const ChatHeader = () => {

  const [membersModalIsOpen, setMembersModalIsOpen] = useState(false)

  const { chatState: { currentChatroom } } = useChatContext()
  const { userState: { user } } = useAuthContext()

  // const slug = currentChatroom?.type === "MANY_TO_MANY" ? currentChatroom.name : currentChatroom?.users?.find(u => Number(u.id) !== Number(user.id))?.username


  return (
    <div className={styles.chatHeaderContainer}>
      <div className={styles.col}>
        <div className={styles.left}>
          <div>
            <img className={styles.icon} src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="avatar" />
          </div>
          <h3 className={styles.username}>
            {currentChatroom.slug}
          </h3>
        </div>
        <div className={styles.right}>
          <BsThreeDots />
        </div>
      </div>
      <div className={styles.col}>
        <ul className={styles.filter}>
          <li className={`${styles.filterItem} ${styles.active}`}>Conversations</li>
          <li className={styles.filterItem}>Media</li>
          <li className={styles.filterItem}>Files</li>
        </ul>
        {
          currentChatroom?.type === "MANY_TO_MANY" && (
            <div className={styles.chatroomUsers}>
              <MdGroups className={styles.membersIcon} />
              <li className={styles.filterItem} onClick={() => setMembersModalIsOpen(true)}>Members</li>
            </div>
          )
        }
        {
          membersModalIsOpen && <MembersModal setMembersModalIsOpen={setMembersModalIsOpen} />
        }
      </div>

    </div>
  )
}

export default ChatHeader