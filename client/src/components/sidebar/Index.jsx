import React from 'react'

import { BsChatSquareTextFill, BsChatLeftText } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'

import { useAuthContext } from '../../context'
import { Link, useNavigate } from 'react-router-dom'

import styles from './styles.module.css'

const SideBar = () => {
  const { onLogOut } = useAuthContext()
  const navigate = useNavigate();

  const logOutHandler = () => {
    onLogOut()
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate('/signin')
  }

  return (
    <div className={styles.sidebarContainer}>
      <Link to="/chat">
        <div className={styles.logo}>
          <BsChatSquareTextFill />
        </div>
      </Link>
      <div className={styles.links}>
        <BsChatLeftText className={styles.active} />
        <FiUsers />
      </div>
      <div className={styles.signout} onClick={logOutHandler}>
        <MdLogout />
      </div>
    </div>
  )
}

export default SideBar
