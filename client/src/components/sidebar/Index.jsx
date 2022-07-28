import React from 'react'

import {BsChatSquareTextFill,BsChatLeftText} from 'react-icons/bs'
import {MdLogout} from 'react-icons/md'
import {FiUsers} from 'react-icons/fi'

import styles from './styles.module.css'

const SideBar = ()=> {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logo}>
        <BsChatSquareTextFill />
      </div>
      <div className={styles.links}>
        <BsChatLeftText className={styles.active}/>
        <FiUsers />
      </div>
      <div className={styles.signout}>
        <MdLogout />
      </div>
    </div>
  )
}

export default SideBar
