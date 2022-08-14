import React from 'react'

import { BsChatSquareTextFill, BsChatLeftText } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'

import { useAuthContext, useChatContext } from '../../context'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'
import { useSidebarContext } from '../../context/sidebarContext/sidebarContext'

const SideBar = () => {
  const { onLogOut } = useAuthContext()
  const navigate = useNavigate();

  const { setSidebarCurrentElement } = useSidebarContext()
  const { resetContextHandler } = useChatContext()

  const logOutHandler = () => {
    onLogOut()
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate('/signin')
    resetContextHandler()
  }

  const navigateHome = () => {
    navigate('/chat')
    setSidebarCurrentElement("conversations")
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logo} onClick={navigateHome}>
        <BsChatSquareTextFill />
      </div>
      <div className={styles.links}>
        <BsChatLeftText className={styles.active} id="conversations" onClick={(e) => setSidebarCurrentElement(e.target.id)} />
        <FiUsers id="users" onClick={(e) => setSidebarCurrentElement(e.target.id)} />
      </div>
      <div className={styles.signout} onClick={logOutHandler}>
        <MdLogout />
      </div>
    </div>
  )
}

export default SideBar
