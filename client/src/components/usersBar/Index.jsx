import React from 'react'
import ChatSidebarHeader from '../chatSidebarHeader/Index'
import { BiSearch } from 'react-icons/bi'
import { HiStatusOnline } from 'react-icons/hi'
import styles from './styles.module.css'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../graphql/chat'
import { useState } from 'react'
import { useChatContext } from '../../context'

const UsersBar = () => {

    const { chatState: { chatUsers }, setChatUsersHandler } = useChatContext()

    const [users, setUsers] = useState([])

    const { loading, error, data } = useQuery(GET_USERS, {
        onCompleted: (data) => {
            console.log(data.getUsers);
            setUsers(data.getUsers)
            setChatUsersHandler(data.getUsers)
        },
        onError: (error) => {
            console.log(error);
        }
    })


    const userss = [
        {
            id: "1",
            email: "admin@gmail.com",
            username: "admin"
        },
        {
            id: "2",
            email: "mishikoqajaia50@gmail.com",
            username: "misho"
        },
        {
            id: "3",
            email: "john@gmail.com",
            username: "john"
        },
        {
            id: "5",
            email: "tom@gmail.com",
            username: "tom"
        },
        {
            id: "8",
            email: "mishooo99@mail.ru",
            username: "beth"
        },
        {
            id: "9",
            email: "mishooo99@mail.ru",
            username: "mike"
        },
        {
            id: "10",
            email: "mishooo99@mail.ru",
            username: "brad"
        },
        {
            id: "11",
            email: "mishooo99@mail.ru",
            username: "silvio"
        },
        {
            id: "12",
            email: "mishooo99@mail.ru",
            username: "kate"
        },
        // {
        //     id: "14",
        //     email: "mishooo99@mail.ru",
        //     username: "aise"
        // },
        // {
        //     id: "15",
        //     email: "mishooo99@mail.ru",
        //     username: "kise"
        // },
        // {
        //     id: "16",
        //     email: "mishooo99@mail.ru",
        //     username: "kise"
        // },
        // {
        //     id: "17",
        //     email: "mishooo99@mail.ru",
        //     username: "kise"
        // },
        // {
        //     id: "18",
        //     email: "mishooo99@mail.ru",
        //     username: "qise"
        // },
        // {
        //     id: "19",
        //     email: "mishooo99@mail.ru",
        //     username: "sise"
        // },
        // {
        //     id: "20",
        //     email: "mishooo99@mail.ru",
        //     username: "tise"
        // }
    ];
    let previousChar = ''
    const usersList = chatUsers?.slice().sort((a, b) => a.username.localeCompare(b.username))?.map((u, i) => {
        const param = uuidv4().concat(u.id)

        if (u.username.charAt(0) !== previousChar) {
            previousChar = u.username.charAt(0)
            return (

                <div key={i}>
                    <div >
                        <div className={styles.albhabet} key={'c' + u.id}>{previousChar}</div>
                    </div>
                    <Link to={param} className={styles.userList}>
                        <div className={styles.username} >{u.username}</div>
                        <div className={styles.status} >
                            <HiStatusOnline />
                        </div>
                    </Link>
                </div>
            )
        } else {
            return (
                <Link to={param} className={styles.userList} key={i}>
                    <div className={styles.username} >{u.username}</div>
                    <div className={styles.status} >
                        <HiStatusOnline />
                    </div>
                </Link>
            )
        }
    })

    return <div className={styles.usersListContainer}>{usersList}</div>

}

export default UsersBar