import React from 'react'
import ChatSidebarHeader from '../chatSidebarHeader/Index'
import { BiSearch } from 'react-icons/bi'
import styles from './styles.module.css'
import { useChatContext } from '../../context'

const ChatSidebarLayout = ({ children }) => {

    const {chatState:{searchKeyword}, setSeachKeywordHandler } = useChatContext()

    return (
        <div className={styles.chatSidebar}>
            <ChatSidebarHeader />
            <div className={styles.chatSidebarBody}>
                <div className={styles.wrapper}>
                    <div className={styles.search}>
                        <input type="text" placeholder='Search' className={styles.searchInput} value={searchKeyword} onChange={(e) => setSeachKeywordHandler(e.target.value)} />
                        <BiSearch className={styles.searchIcon} />
                    </div>
                    {/* <div className={styles.conversations}> */}
                    {children}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default ChatSidebarLayout